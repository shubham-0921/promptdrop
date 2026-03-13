interface BadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function Badge({ children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex items-center border-2 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide font-mono ${className}`}>
      {children}
    </span>
  );
}
