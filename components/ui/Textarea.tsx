import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  charCount?: { current: number; max: number };
}

export function Textarea({ label, error, charCount, className = '', id, ...props }: TextareaProps) {
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
      <textarea
        id={id}
        className={`input-retro resize-none ${error ? 'error' : ''} ${className}`}
        {...props}
      />
      {error && <p className="text-xs text-[var(--pink)] font-mono">{error}</p>}
    </div>
  );
}
