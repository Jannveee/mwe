import MessageList from "./MessageList.jsx";
import ChatInput from "./ChatInput.jsx";

export default function ChatDrawer({
  isOpen,
  onClose,
  messages,
  isLoading,
  error,
  onSend,
  onClear,
}) {
  return (
    <div
      className={[
        "fixed inset-0 z-[9999]",
        "pointer-events-none",
        "transition-opacity duration-500",
        "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
        isOpen
          ? "bg-slate-950/20 backdrop-blur-[2px] pointer-events-auto opacity-100"
          : "bg-transparent opacity-0",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="TeamSumit Executive Assistant"
        className={[
          "fixed",
          "flex min-h-0 flex-col overflow-hidden",

          /* Mobile */
          "inset-0",
          "w-full",
          "rounded-none",

          /* Desktop */
          "sm:top-5",
          "sm:right-5",
          "sm:bottom-5",
          "sm:left-auto",
          "sm:w-[480px]",
          "sm:rounded-[30px]",

          "border border-black/10",
          "bg-[#f8f8f6]",
          "shadow-[0_40px_120px_rgba(0,0,0,0.30)]",

          /*
           * The drawer expands from its bottom-right corner.
           * This keeps the desktop animation visually connected
           * to the launcher pill.
           */
          "origin-bottom-right",

          "transition-[transform,opacity] duration-500",
          "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",

          isOpen
            ? [
                "translate-y-0",
                "scale-100",
                "opacity-100",
                "pointer-events-auto",
              ].join(" ")
            : [
                /*
                 * Mobile:
                 * Slide down and slightly shrink.
                 */
                "translate-y-8",
                "scale-[0.98]",
                "opacity-0",
                "pointer-events-none",

                /*
                 * Desktop:
                 * Shrink toward the bottom-right corner.
                 */
                "sm:translate-y-8",
                "sm:scale-[0.86]",
              ].join(" "),
        ].join(" ")}
      >
        {/* Header */}
        <header className="relative shrink-0 overflow-hidden bg-[#101010] px-5 pb-5 pt-5 text-white sm:px-7 sm:pb-7 sm:pt-6">
          <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.035]" />
          <div className="absolute -bottom-20 -left-12 h-36 w-36 rounded-full bg-white/[0.025]" />

          <div className="relative pr-12 sm:pr-14">
            <p className="mb-2 !text-[9px] !font-semibold !uppercase !tracking-[0.24em] !text-white/45">
              TeamSumit
            </p>

            <h2 className="!text-[22px] !font-medium !leading-tight !tracking-[-0.03em] !text-white sm:!text-[25px]">
              Executive Assistant
            </h2>

            <p className="mt-2 max-w-[280px] !text-[11px] !leading-relaxed !text-white/55">
              Professional assistance for enquiries, engagements,
              and information about Sumit Waghmare.
            </p>
          </div>

          {/* Close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Executive Assistant"
            className={[
              "absolute right-4 top-4",
              "flex h-9 w-9 shrink-0 items-center justify-center",
              "rounded-full",
              "border border-white/10",
              "bg-white/[0.06]",
              "!text-white/70",
              "transition-colors duration-200",
              "hover:bg-white/[0.1]",
              "hover:!text-white",
              "focus:outline-none",
              "focus:ring-2",
              "focus:ring-white/20",
              "sm:right-6 sm:top-6",
            ].join(" ")}
          >
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.7"
            >
              <path
                d="M6 6l12 12M18 6L6 18"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </header>

        {/* Scope bar */}
        <div className="shrink-0 border-b border-black/[0.06] bg-[#f1f1ee] px-5 py-2.5 sm:px-7 sm:py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#8fa27e]" />

              <span className="truncate text-[9px] font-semibold uppercase tracking-[0.18em] text-black/45">
                Executive Interface
              </span>
            </div>

            <span className="shrink-0 text-[8px] font-medium uppercase tracking-[0.16em] text-black/25">
              EA / 01
            </span>
          </div>
        </div>

        {/* Conversation */}
        <div className="min-h-0 flex-1 overflow-hidden">
          <MessageList
            messages={messages}
            isLoading={isLoading}
          />
        </div>

        {/* Error */}
        {error ? (
          <div className="shrink-0 border-t border-black/[0.06] bg-red-50 px-5 py-3 sm:px-7">
            <p className="text-[10px] leading-relaxed text-red-700">
              {error}
            </p>
          </div>
        ) : null}

        {/* Input */}
        <div className="shrink-0 border-t border-black/[0.06] bg-[#f8f8f6] px-4 pb-[max(16px,env(safe-area-inset-bottom))] pt-3 sm:px-5 sm:pb-5">
          <ChatInput
            onSend={onSend}
            isLoading={isLoading}
          />
        </div>
      </section>
    </div>
  );
}