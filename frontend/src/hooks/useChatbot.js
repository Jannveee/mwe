import { useCallback, useState } from "react";
import { sendChatMessage } from "../services/chatbotApi";

const INITIAL_MESSAGE = {
  id: "assistant-initial",
  role: "assistant",
  content:
    "Hello. You are interacting with Sumit Waghmare’s professional executive assistant. How may I assist you?",
};

function createMessage(role, content) {
  return {
    id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
    role,
    content,
  };
}

export default function useChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [conversationState, setConversationState] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onOpen = useCallback(() => {
    setIsOpen(true);
    setError("");
  }, []);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  const onClear = useCallback(() => {
    setMessages([INITIAL_MESSAGE]);
    setConversationState(null);
    setError("");
    setIsLoading(false);
  }, []);

  const onSend = useCallback(
    async (content) => {
      const trimmedContent = String(content || "").trim();

      if (!trimmedContent || isLoading) {
        return;
      }

      const userMessage = createMessage("user", trimmedContent);

      const nextMessages = [...messages, userMessage];

      setMessages(nextMessages);
      setError("");
      setIsLoading(true);

      try {
        const response = await sendChatMessage({
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
          conversationState,
        });

        if (!response?.message) {
          throw new Error(
            "The chatbot returned an unexpected response."
          );
        }

        const assistantMessage =
          typeof response.message === "string"
            ? createMessage("assistant", response.message)
            : {
                id:
                  response.message.id ||
                  createMessage("assistant", "").id,
                role: "assistant",
                content: response.message.content || "",
              };

        if (!assistantMessage.content) {
          throw new Error(
            "The chatbot returned an empty response."
          );
        }

        setMessages((currentMessages) => [
          ...currentMessages,
          assistantMessage,
        ]);

        if (response.conversationState !== undefined) {
          setConversationState(response.conversationState);
        }
      } catch (err) {
        console.error("[useChatbot] Error:", err);

        setError(
          err?.message ||
            "The executive assistant is temporarily unavailable."
        );
      } finally {
        setIsLoading(false);
      }
    },
    [conversationState, isLoading, messages]
  );

  return {
    isOpen,
    onOpen,
    onClose,
    messages,
    isLoading,
    error,
    onSend,
    onClear,
  };
}