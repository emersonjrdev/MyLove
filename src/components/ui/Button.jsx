export default function Button({
  children,
  variant = "primary",
  className = "",
  ...props
}) {
  const base =
    "focus-ring rounded-full px-4 py-2.5 text-sm font-semibold transition active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60";

  const variants = {
    primary:
      "bg-rose-main text-white shadow-md hover:bg-[#b55879] focus-ring",
    ghost:
      "bg-transparent text-rose-wine border border-rose-main/40 hover:bg-rose-main/10 focus-ring",
    soft:
      "bg-rose-main/15 text-rose-wine hover:bg-rose-main/25 focus-ring",
  };

  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
