import ChatDrawer from "./ChatDrawer.jsx";

export default function ChatWidget({
  isOpen,
  onOpen,
  onClose,
  messages,
  isLoading,
  error,
  onSend,
  onClear
}) {
  return (
    <>
      <button
        type="button"
        onClick={isOpen ? onClose : onOpen}
        aria-label={
          isOpen
            ? "Close Executive Assistant"
            : "Open Executive Assistant"
        }
        className={[
          "fixed bottom-6 right-6 z-[60]",
          "flex items-center gap-3",
          "rounded-full",
          "border border-black/10",
          "bg-[#111111]",
          "px-5 py-3.5",
          "text-[10px] font-semibold uppercase tracking-[0.16em]",
          "!text-white",
          "shadow-[0_20px_60px_rgba(0,0,0,0.20)]",
          "transition-all duration-500",
          "hover:bg-black hover:shadow-[0_24px_70px_rgba(0,0,0,0.25)]",
          "focus:outline-none focus:ring-2 focus:ring-black/20 focus:ring-offset-2",
          isOpen
            ? "pointer-events-none translate-y-4 scale-90 opacity-0"
            : "translate-y-0 scale-100 opacity-100"
        ].join(" ")}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inset-0 animate-ping rounded-full bg-[#b7c9a8] opacity-60" />
          <span className="relative h-2 w-2 rounded-full bg-[#b7c9a8]" />
        </span>

        <span>Executive Assistant</span>

        <span className="ml-1 h-px w-5 bg-white/30" />
      </button>

      <ChatDrawer
        isOpen={isOpen}
        onClose={onClose}
        messages={messages}
        isLoading={isLoading}
        error={error}
        onSend={onSend}
        onClear={onClear}
      />
    </>
  );
}