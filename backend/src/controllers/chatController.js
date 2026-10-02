'use strict';

const crypto = require('crypto');

async function loadChatbotServices() {
  const [
    guardrailModule,
    conversationTreeModule,
    geminiModule
  ] = await Promise.all([
    import('../services/chatbot/guardrailService.js'),
    import('../services/chatbot/conversationTreeService.js'),
    import('../services/chatbot/geminiService.js')
  ]);

  return {
    evaluateMessage:
      guardrailModule.evaluateMessage,

    updateConversationState:
      conversationTreeModule.updateConversationState,

    buildConversationContext:
      conversationTreeModule.buildConversationContext,

    generateChatResponse:
      geminiModule.generateChatResponse
  };
}

function getLatestUserMessage(messages) {
  if (!Array.isArray(messages)) {
    return '';
  }

  for (
    let index = messages.length - 1;
    index >= 0;
    index -= 1
  ) {
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
        (message.role === 'user' ||
          message.role === 'assistant') &&
        typeof message.content === 'string'
    )
    .map((message) => ({
      role: message.role,
      content: message.content
        .replace(/\u0000/g, '')
        .trim()
    }))
    .filter(
      (message) =>
        message.content.length > 0
    );
}

function createAssistantMessage(content) {
  return {
    id: crypto.randomUUID(),
    role: 'assistant',
    content: String(content || '').trim()
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

  if (
    result.message &&
    typeof result.message.content === 'string'
  ) {
    return result.message.content.trim();
  }

  return '';
}

function sendSuccessResponse(res, message, conversationState) {
  const responseMessage = createAssistantMessage(message);

  return res.status(200).json({
    success: true,
    message: responseMessage,
    conversationState: conversationState || null,
    data: {
      message: responseMessage,
      conversationState: conversationState || null
    }
  });
}

async function handleChat(req, res) {
  try {
    const {
      messages,
      conversationState = null
    } = req.body || {};

    const sanitizedMessages =
      sanitizeMessages(messages);

    const latestUserMessage =
      getLatestUserMessage(
        sanitizedMessages
      );

    if (!latestUserMessage) {
      return res.status(400).json({
        success: false,
        error:
          'A valid user message is required.'
      });
    }

    const {
      evaluateMessage,
      updateConversationState,
      buildConversationContext,
      generateChatResponse
    } = await loadChatbotServices();

    const guardrailResult =
      evaluateMessage({
        message: latestUserMessage,
        messages: sanitizedMessages
      });

    if (!guardrailResult.allowed) {
      return sendSuccessResponse(
        res,
        guardrailResult.response,
        conversationState
      );
    }

    const nextConversationState =
      updateConversationState({
        message: latestUserMessage,
        previousState:
          conversationState
      });

    const conversationContext =
      buildConversationContext(
        nextConversationState
      );

    const result =
      await generateChatResponse({
        messages: sanitizedMessages,
        context: conversationContext
      });

    const generatedContent =
      extractGeneratedContent(result);

    if (!generatedContent) {
      const error =
        new Error(
          'Gemini returned an empty response.'
        );

      error.code =
        'GEMINI_EMPTY_RESPONSE';

      throw error;
    }

    return sendSuccessResponse(
      res,
      generatedContent,
      nextConversationState
    );
  } catch (error) {
    console.error(
      '[chatController]',
      error
    );

    if (
      error?.code ===
      'GEMINI_CONFIG_ERROR'
    ) {
      return res.status(503).json({
        success: false,
        error:
          'The AI service is not configured correctly.'
      });
    }

    if (
      error?.code ===
      'GEMINI_TIMEOUT'
    ) {
      return res.status(504).json({
        success: false,
        error:
          'The AI service took too long to respond. Please try again.'
      });
    }

    if (
      error?.code ===
      'GEMINI_EMPTY_RESPONSE'
    ) {
      return res.status(502).json({
        success: false,
        error:
          'The AI service returned an empty response. Please try again.'
      });
    }

    return res.status(500).json({
      success: false,
      error:
        'The executive assistant is temporarily unavailable.'
    });
  }
}

module.exports = {
  handleChat
};