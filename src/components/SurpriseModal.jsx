import { useMemo } from "react";
import { Heart } from "lucide-react";
import Modal from "./ui/Modal";
import Button from "./ui/Button";

export default function SurpriseModal({
  isOpen,
  onClose,
  message,
  onNextMessage,
}) {
  const hearts = useMemo(
    () =>
      Array.from({ length: 12 }).map((_, index) => ({
        id: index,
        left: 6 + Math.random() * 88,
        delay: Math.random() * 0.8,
        size: 14 + Math.random() * 18,
      })),
    [isOpen]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Surpresa para você"
      labelledBy="surprise-title"
      describedBy="surprise-body"
    >
      <div className="relative overflow-hidden rounded-2xl border border-rose-main/20 bg-white/40 p-5 dark:bg-black/20">
        <p className="font-romantic text-xl text-wine-dark" aria-live="polite">
          "{message}"
        </p>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24" aria-hidden="true">
          {hearts.map((heart) => (
            <Heart
              key={heart.id}
              className="surprise-heart"
              fill="currentColor"
              size={heart.size}
              style={{
                left: `${heart.left}%`,
                animationDelay: `${heart.delay}s`,
              }}
            />
          ))}
        </div>
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button type="button" onClick={onNextMessage}>
          Nova mensagem
        </Button>
        <Button type="button" variant="ghost" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </Modal>
  );
}
