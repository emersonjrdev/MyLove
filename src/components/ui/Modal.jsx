import { useEffect, useRef } from "react";
import { X } from "lucide-react";

function getFocusable(root) {
  if (!root) return [];
  return Array.from(
    root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((node) => !node.hasAttribute("disabled"));
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  labelledBy,
  describedBy,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return undefined;

    const previous = document.activeElement;
    const focusable = getFocusable(panelRef.current);
    focusable[0]?.focus();

    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
      if (event.key !== "Tab") return;

      const nodes = getFocusable(panelRef.current);
      if (!nodes.length) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      if (previous instanceof HTMLElement) previous.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-describedby={describedBy}
        className="glass-romantic relative max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-3xl p-5 sm:p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <h2 id={labelledBy} className="section-title text-2xl font-semibold">
            {title}
          </h2>
          <button
            type="button"
            aria-label="Fechar modal"
            className="focus-ring rounded-full p-2 text-rose-wine hover:bg-rose-main/15"
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>
        <div id={describedBy}>{children}</div>
      </div>
    </div>
  );
}
