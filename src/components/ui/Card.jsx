export default function Card({ as: Tag = "section", className = "", children, ...props }) {
  return (
    <Tag
      className={`glass-romantic rounded-3xl p-4 sm:p-6 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
