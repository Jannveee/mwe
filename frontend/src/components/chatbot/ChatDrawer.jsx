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
"transition-[background-color,backdrop-filter,opacity] duration-500",
"[transition-timing-function(0.22,1,0.36,1)]",
isOpen
? "bg-slate-950/35 opacity-100 backdrop-blur-md pointer-events-auto"
: "bg-transparent opacity-0 backdrop-blur-none",
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
"border border-black/10",
"bg-[#f8f8f6]",
"shadow-[0_30px_100px_rgba(0,0,0,0.28)]",
"origin-bottom-right",
"transition-[transform,opacity] duration-500",
"[transition-timing-function(0.22,1,0.36,1)]",

      /* Mobile: floating, rounded panel */
      "left-3 right-3 top-[4vh] bottom-[4vh]",
      "w-auto",
      "rounded-[26px]",

      /* Desktop: preserve the established drawer layout */
      "sm:top-5 sm:right-5 sm:bottom-5 sm:left-auto",
      "sm:w-[480px]",
      "sm:rounded-[30px]",

      isOpen
        ? [
            "translate-y-0",
            "scale-100",
            "opacity-100",
            "pointer-events-auto",
          ].join(" ")
        : [
            "translate-y-8",
            "scale-[0.98]",
            "opacity-0",
            "pointer-events-none",
            "sm:translate-y-8",
            "sm:scale-[0.86]",
          ].join(" "),
    ].join(" ")}
  >
    {/* Header */}
    <header className="relative shrink-0 overflow-hidden bg-[#101010] px-5 pb-5 pt-5 text-white sm:px-7 sm:pb-7 sm:pt-6">
      <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-white/[0.035]" />
      <div className="absolute -bottom-20 -left-12 h-36 w-36 rounded-full bg-white/[0.025]" />

      <div className="relative pr-24 sm:pr-24">
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

      {/* New Chat */}
      <button
        type="button"
        onClick={onClear}
        disabled={isLoading}
        aria-label="Start a new chat"
        title="New chat"
        className={[
          "absolute right-[58px] top-4 sm:top-6 sm:right-[70px]",
          "flex h-9 w-9 items-center justify-center",
          "rounded-full border border-white/10",
          "bg-white/[0.06] !text-white/75",
          "transition-colors duration-200",
          "hover:bg-white/[0.12] hover:!text-white",
          "disabled:cursor-not-allowed disabled:opacity-35",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
        ].join(" ")}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>

      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close Executive Assistant"
        title="Close"
        className={[
          "absolute right-4 top-4 sm:right-6 sm:top-6",
          "flex h-9 w-9 items-center justify-center",
          "rounded-full border border-white/10",
          "bg-white/[0.06] !text-white/75",
          "transition-colors duration-200",
          "hover:bg-white/[0.12] hover:!text-white",
          "focus:outline-none focus:ring-2 focus:ring-white/20",
        ].join(" ")}
      >
        <svg
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
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
    <div className="shrink-0">
      <ChatInput
        onSubmit={onSend}
        disabled={isLoading}
      />
    </div>
  </section>
</div>

);
}