import crypto from 'crypto';
import { jsonResponse, handleOptions } from '../../../middleware/cors.js';
import { evaluateMessage } from '../../../services/chatbot/guardrailService.js';
import { updateConversationState, buildConversationContext } from '../../../services/chatbot/conversationTreeService.js';
import { generateChatResponse } from '../../../services/chatbot/geminiService.js';

export async function OPTIONS(req) {
  return handleOptions(req);
}

function getLatestUserMessage(messages) {
  if (!Array.isArray(messages)) {
    return '';
  }

  for (let index = messages.length - 1; index >= 0; index -= 1) {
    const message = messages[index];
    if (
      message &&
      message.role === 'user' &&
      typeof message.content === 'string'
    ) {
      return message.content.trim();
    }
  }

  return '';
}

function sanitizeMessages(messages) {
  if (!Array.isArray(messages)) {
    return [];
  }

  return messages
    .filter(
      (message) =>
        message &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string'
    )
    .map((message) => ({
      role: message.role,
      content: message.content.replace(/\u0000/g, '').trim(),
    }))
    .filter((message) => message.content.length > 0);
}

function createAssistantMessage(content) {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: String(content || '').trim(),
  };
}

function extractGeneratedContent(result) {
  if (typeof result === 'string') {
    return result.trim();
  }

  if (!result || typeof result !== 'object') {
    return '';
  }

  if (typeof result.content === 'string') {
    return result.content.trim();
  }

  if (typeof result.text === 'string') {
    return result.text.trim();
  }

  if (result.message && typeof result.message.content === 'string') {
    return result.message.content.trim();
  }

  return '';
}

function sendSuccessResponse(message, conversationState, req) {
  const responseMessage = createAssistantMessage(message);

  return jsonResponse(
    {
      success: true,
      message: responseMessage,
      conversationState: conversationState || null,
      data: {
        message: responseMessage,
        conversationState: conversationState || null,
      },
    },
    200,
    req
  );
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    body = {};
  }

  try {
    const { messages, conversationState = null } = body || {};

    const sanitizedMessages = sanitizeMessages(messages);
    const latestUserMessage = getLatestUserMessage(sanitizedMessages);

    if (!latestUserMessage) {
      return jsonResponse(
        {
          success: false,
          error: 'A valid user message is required.',
        },
        400,
        req
      );
    }

    const guardrailResult = evaluateMessage({
      message: latestUserMessage,
      messages: sanitizedMessages,
    });

    if (!guardrailResult.allowed) {
      return sendSuccessResponse(
        guardrailResult.response,
        conversationState,
        req
      );
    }

    const nextConversationState = updateConversationState({
      message: latestUserMessage,
      previousState: conversationState,
    });

    const conversationContext = buildConversationContext(nextConversationState);

    const result = await generateChatResponse({
      messages: sanitizedMessages,
      context: conversationContext,
    });

    const generatedContent = extractGeneratedContent(result);

    if (!generatedContent) {
      const error = new Error('Gemini returned an empty response.');
      error.code = 'GEMINI_EMPTY_RESPONSE';
      throw error;
    }

    return sendSuccessResponse(
      generatedContent,
      nextConversationState,
      req
    );
  } catch (error) {
    console.error('[chatRoute]', error);

    if (error?.code === 'GEMINI_CONFIG_ERROR') {
      return jsonResponse(
        {
          success: false,
          error: 'The AI service is not configured correctly.',
        },
        503,
        req
      );
    }

    if (error?.code === 'GEMINI_TIMEOUT') {
      return jsonResponse(
        {
          success: false,
          error: 'The AI service took too long to respond. Please try again.',
        },
        504,
        req
      );
    }

    if (error?.code === 'GEMINI_EMPTY_RESPONSE') {
      return jsonResponse(
        {
          success: false,
          error: 'The AI service returned an empty response. Please try again.',
        },
        502,
        req
      );
    }

    return jsonResponse(
      {
        success: false,
        error: 'The executive assistant is temporarily unavailable.',
      },
      500,
      req
    );
  }
}
