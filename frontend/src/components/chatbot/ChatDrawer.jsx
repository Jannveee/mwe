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
        "transition-all duration-500",
        isOpen
          ? "bg-slate-950/20 backdrop-blur-[2px] pointer-events-auto"
          : "bg-transparent",
      ].join(" ")}
      aria-hidden={!isOpen}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-label="TeamSumit Executive Assistant"
        className={[
          "fixed top-5 right-5 bottom-5",
          "flex flex-col overflow-hidden",
          "w-[calc(100vw-40px)] sm:w-[480px]",
          "rounded-[30px]",
          "border border-black/10",
          "bg-[#f8f8f6]",
          "shadow-[0_40px_120px_rgba(0,0,0,0.30)]",
          "origin-bottom-right",
          "transition-all duration-500",
          "[transition-timing-function:cubic-bezier(0.22,1,0.36,1)]",
          isOpen
            ? "translate-y-0 scale-100 opacity-100 pointer-events-auto"
            : "translate-y-8 scale-[0.92] opacity-0 pointer-events-none",
        ].join(" ")}
      >
        {/* Header */}
        <header className="relative shrink-0 overflow-hidden bg-[#101010] px-7 pb-7 pt-6 text-white">
          {/* Architectural background detail */}
          <div className="pointer-events-none absolute right-[-70px] top-[-100px] h-[240px] w-[240px] rounded-full border border-white/[0.04]" />
          <div className="pointer-events-none absolute right-[-35px] top-[-65px] h-[170px] w-[170px] rounded-full border border-white/[0.04]" />

          <div className="relative z-10">
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[9px] font-medium uppercase tracking-[0.34em] text-white/40">
                  TEAMSUMIT
                </p>

                <h2 className="mt-3 !text-[22px] !font-medium !tracking-[-0.025em] !text-white">
                  Executive Assistant
                </h2>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#b7c9a8]" />

                  <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/45">
                    Professional enquiries
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClear}
                  className="rounded-full border border-white/10 px-3.5 py-2 text-[10px] font-medium uppercase tracking-[0.12em] text-white/55 transition-all hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                >
                  New
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  aria-label="Close Executive Assistant"
                  className="group flex h-9 w-9 items-center justify-center rounded-full border border-white/10 transition-all hover:border-white/25 hover:bg-white/[0.08]"
                >
                  <span className="relative block h-4 w-4">
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white/50 transition-colors group-hover:bg-white" />
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white/50 transition-colors group-hover:bg-white" />
                  </span>
                </button>
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-6">
              <p className="max-w-[290px] text-[12px] leading-5 text-white/50">
                A direct interface for professional enquiries across the
                TeamSumit ecosystem.
              </p>

              <span className="hidden text-[9px] font-medium uppercase tracking-[0.22em] text-white/25 sm:block">
                EA / 01
              </span>
            </div>
          </div>
        </header>

        {/* Scope bar */}
        <div className="shrink-0 border-b border-black/[0.06] bg-[#f1f1ee] px-7 py-3">
          <p className="text-[9px] font-medium uppercase tracking-[0.17em] text-black/35">
            Sumit Waghmare · SuPrazo · CodeElevate · SuPrathon
          </p>
        </div>

        {/* Conversation */}
        <MessageList
          messages={messages}
          isLoading={isLoading}
        />

        {/* Error */}
        {error && (
          <div className="shrink-0 border-t border-red-900/10 bg-red-50 px-7 py-3 text-[11px] leading-5 text-red-700">
            {error}
          </div>
        )}

        {/* Input */}
        <div className="shrink-0 bg-[#f8f8f6] px-7 pb-6 pt-3">
          <ChatInput
            disabled={isLoading}
            onSubmit={(message) => onSend(message, "general")}
          />

          <p className="mt-2 text-center text-[9px] font-medium uppercase tracking-[0.18em] text-black/40">
            TEAMSUMIT EXECUTIVE INTERFACE
          </p>
        </div>
      </section>
    </div>
  );
}