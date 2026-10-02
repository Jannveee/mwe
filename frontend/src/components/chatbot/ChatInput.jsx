import { useEffect, useRef, useState } from "react";

const MAX_LENGTH = 4000;

export default function ChatInput({ onSubmit, disabled }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  useEffect(() => {
    const textarea = textareaRef.current;

    if (!textarea) return;

    textarea.style.height = "auto";
    textarea.style.height = `${Math.min(
      Math.max(textarea.scrollHeight, 52),
      110
    )}px`;
  }, [value]);

  function handleSubmit(event) {
    event.preventDefault();

    const normalizedValue = value
      .replace(/\u0000/g, "")
      .trim();

    if (!normalizedValue || disabled) return;

    onSubmit(normalizedValue);
    setValue("");
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="border-t border-black/[0.06] bg-[#f8f8f6] px-5 pb-5 pt-4 sm:px-6"
    >
      <div className="group rounded-[22px] border border-black/[0.10] bg-white px-4 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.035)] transition-all duration-300 focus-within:border-black/25 focus-within:shadow-[0_12px_40px_rgba(0,0,0,0.07)]">
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(event) =>
              setValue(
                event.target.value.slice(0, MAX_LENGTH)
              )
            }
            onKeyDown={handleKeyDown}
            disabled={disabled}
            rows={3}
            maxLength={MAX_LENGTH}
            placeholder="Write your enquiry..."
            aria-label="Message"
            className={[
              "max-h-[110px] min-h-[52px] flex-1 resize-none",
              "border-0 !border-0",
              "bg-transparent",
              "px-1 py-2",
              "text-[14px] leading-6 text-[#171717]",
              "outline-none !outline-none",
              "ring-0 !ring-0",
              "shadow-none !shadow-none",
              "focus:border-0 focus:!border-0",
              "focus:outline-none focus:!outline-none",
              "focus:ring-0 focus:!ring-0",
              "focus:shadow-none",
              "placeholder:text-black/30",
              "disabled:cursor-not-allowed",
            ].join(" ")}
          />

          <button
            type="submit"
            disabled={disabled || !value.trim()}
            aria-label="Send message"
            className={[
              "group/send flex h-10 w-10 shrink-0 items-center justify-center",
              "rounded-full",
              "!border-0",
              "!bg-[#171717]",
              "!text-white",
              "shadow-none !shadow-none",
              "outline-none !outline-none",
              "ring-0 !ring-0",
              "transition-all duration-300",
              "hover:scale-105 hover:!bg-black",
              "focus:outline-none focus:!outline-none",
              "focus:ring-0 focus:!ring-0",
              "disabled:cursor-not-allowed",
              "disabled:!bg-black/[0.08]",
              "disabled:!text-black/20",
              "disabled:hover:scale-100",
            ].join(" ")}
          >
            <span className="relative block h-4 w-4 !text-white">
              <span className="absolute left-[1px] top-[6px] h-px w-3.5 rotate-[-35deg] !bg-current transition-transform duration-300 group-hover/send:translate-x-0.5" />
              <span className="absolute left-[1px] top-[10px] h-px w-3.5 rotate-[35deg] !bg-current transition-transform duration-300 group-hover/send:translate-x-0.5" />
              <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full !bg-current" />
            </span>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-between px-1">
          <span className="text-[9px] font-medium uppercase tracking-[0.12em] text-black/25">
            Enter to send · Shift + Enter for new line
          </span>

          {value.length > 0 && (
            <span className="text-[9px] tabular-nums text-black/25">
              {value.length}/{MAX_LENGTH}
            </span>
          )}
        </div>
      </div>
    </form>
  );
}