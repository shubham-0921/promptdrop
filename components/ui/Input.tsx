import { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  charCount?: { current: number; max: number };
}

export function Input({ label, error, charCount, className = '', id, ...props }: InputProps) {
  const nearLimit = charCount && charCount.current > charCount.max * 0.9;
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex justify-between items-baseline">
          <label htmlFor={id} className="label">{label}</label>
          {charCount && (
            <span className={`label ${nearLimit ? 'text-[var(--pink)]' : ''}`}>
              {charCount.current}/{charCount.max}
            </span>
          )}
        </div>
      )}
      <input
        id={id}
        className={`input-retro ${error ? 'error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[var(--pink)] font-mono">{error}</p>}
    </div>
  );
}
