// Front/src/pages/Chatbot.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import type { ChatMessage } from "../data/chat";

import ChatComposer from "../components/chatbot/ChatComposer";
import ChatMessageList from "../components/chatbot/ChatMessageList";

import { postChat, toChatbotErrorText } from "../api/ChatbotApi";

export default function Chatbot() {
  const location = useLocation();

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [errorText, setErrorText] = useState<string | null>(null);

  const todayLabel = useMemo(() => {
    const d = new Date();
    const m = d.getMonth() + 1;
    const day = d.getDate();
    return `${m}월 ${day}일`;
  }, []);

  useEffect(() => {
    if (messages.length === 0) return;

    requestAnimationFrame(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    });
  }, [messages.length]);

  const handleSendText = useCallback(
    async (raw: string) => {
      const value = raw.trim();
      if (!value || isSending) return;

      setErrorText(null);
      setIsSending(true);

      const userMessage: ChatMessage = {
        id: `chat-${Date.now()}`,
        role: "user",
        type: "text",
        text: value,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setInput("");

      try {
        const answer = await postChat(value);

        const assistantMessage: ChatMessage = {
          id: `chat-${Date.now()}-assistant`,
          role: "assistant",
          type: "text",
          text: answer,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (e) {
        const msg = toChatbotErrorText(e);
        setErrorText(msg);

        const assistantErrorMessage: ChatMessage = {
          id: `chat-${Date.now()}-assistant-error`,
          role: "assistant",
          type: "text",
          text: msg,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, assistantErrorMessage]);
      } finally {
        setIsSending(false);
      }
    },
    [isSending]
  );

  const handleSend = useCallback(async () => {
    await handleSendText(input);
  }, [handleSendText, input]);

  // HeroSearch에서 넘어온 초기 메시지 자동 전송 (1회만)
  const autoSentRef = useRef(false);
  useEffect(() => {
    if (autoSentRef.current) return;

    const initialMessage =
      (location.state as { initialMessage?: string } | null)?.initialMessage;

    if (!initialMessage) return;

    autoSentRef.current = true;

    setInput(initialMessage);
    void handleSendText(initialMessage);
  }, [location.state, handleSendText]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-4xl px-4 md:px-6">
        <div className="flex justify-center pt-6">
          <div className="px-3 py-1 rounded-full bg-black/5 text-[12px] text-gray-500">
            {todayLabel}
          </div>
        </div>

        {errorText && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorText}
          </div>
        )}

        <ChatMessageList messages={messages} />
      </div>

      <ChatComposer
        input={input}
        isSending={isSending}
        onInputChange={setInput}
        onSend={handleSend}
        onQuickAction={(label) => setInput(label)}
      />
    </div>
  );
}
