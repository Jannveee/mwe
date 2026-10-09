import { useEffect, useRef } from "react";

export default function MessageList({ messages, isLoading }) {
const containerRef = useRef(null);

useEffect(() => {
const container = containerRef.current;

if (!container) return;

container.scrollTo({
  top: container.scrollHeight,
  behavior: "smooth",
});

}, [messages, isLoading]);

return (
<div
ref={containerRef}
data-chat-scroll="true"
className={[
"chat-scrollbar",
"h-full min-h-0 w-full",
"overflow-y-auto overflow-x-hidden",
"overscroll-y-contain",
"[touch-action]",
"[-webkit-overflow-scrolling]",
"bg-[#f8f8f6] px-5 py-6 sm sm",
].join(" ")}
aria-live="polite"
aria-label="Conversation"
>
<div className="mx-auto flex max-w-[410px] flex-col gap-7">
{messages.map((message, index) => {
const isUser = message.role === "user";
const isFirstAssistantMessage =
!isUser && index === 0;

      return (
        <div
          key={message.id}
          className={[
            "flex",
            isUser ? "justify-end" : "justify-start",
          ].join(" ")}
        >
          {isUser ? (
            <div className="max-w-[84%]">
              <div className="mb-2 flex justify-end">
                <span className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/25">
                  You
                </span>
              </div>

              <div className="rounded-[20px] rounded-br-[5px] bg-[#171717] px-4 py-3.5 text-[13px] leading-6 tracking-[-0.005em] !text-white shadow-[0_10px_30px_rgba(0,0,0,0.10)]">
                <p className="whitespace-pre-wrap break-words !text-white">
                  {message.content}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full min-w-0">
              <div className="mb-3 flex items-center gap-3">
                <div className="h-px w-5 shrink-0 bg-black/15" />

                <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-black/30">
                  TeamSumit Executive Assistant
                </span>
              </div>

              <div
                className={[
                  "border-l border-black/10 pl-4",
                  isFirstAssistantMessage ? "pt-0" : "",
                ].join(" ")}
              >
                <p className="whitespace-pre-wrap break-words text-[13px] leading-[1.85] tracking-[-0.005em] text-[#3d3d3a]">
                  {message.content}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    })}

    {isLoading && (
      <div className="flex justify-start">
        <div className="w-full">
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-5 shrink-0 bg-black/15" />

            <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-black/30">
              Preparing response
            </span>
          </div>

          <div className="border-l border-black/10 pl-4">
            <div className="flex items-center gap-1.5 py-2">
              <span className="h-1 w-1 animate-pulse rounded-full bg-black/30" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-black/30 [animation-delay:150ms]" />
              <span className="h-1 w-1 animate-pulse rounded-full bg-black/30 [animation-delay:300ms]" />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>

);
}