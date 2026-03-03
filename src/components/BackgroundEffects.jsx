import { Heart } from "lucide-react";

export default function BackgroundEffects({ parallaxOffset = 0 }) {
  const hearts = Array.from({ length: 8 }).map((_, index) => ({
    id: index,
    left: 8 + index * 12,
    duration: 6 + (index % 3),
    delay: index * 0.3,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="parallax-layer absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-rose-main/20 blur-3xl"
        style={{ transform: `translate(-50%, ${parallaxOffset * 0.15}px)` }}
      />
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="floating-heart absolute text-rose-main/25"
          fill="currentColor"
          size={12 + (heart.id % 4) * 3}
          style={{
            left: `${heart.left}%`,
            top: `${14 + (heart.id % 4) * 18}%`,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
