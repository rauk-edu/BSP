import React from 'react';
import { parseKhmerContentBlocks, splitKhmerBullets } from '../utils/khmerTextFormatter';

interface FormattedKhmerTextProps {
  text: string | undefined | null;
  mode?: 'full' | 'bullets-only' | 'table-cell';
  className?: string;
  dashClassName?: string;
  paragraphClassName?: string;
  emptyText?: string;
}

export const FormattedKhmerText: React.FC<FormattedKhmerTextProps> = ({
  text,
  mode = 'full',
  className = '',
  dashClassName = '',
  paragraphClassName = '',
  emptyText = '-',
}) => {
  if (!text || !text.trim()) {
    return <span className="text-slate-400 italic">{emptyText}</span>;
  }

  // TABLE CELL MODE: compact, each bullet drops to its own line with hanging indent
  if (mode === 'table-cell') {
    const bullets = splitKhmerBullets(text);

    if (bullets.length === 0) {
      return <span className="text-slate-400 italic">{emptyText}</span>;
    }

    // If only one item and it didn't have a bullet originally, render as clean text
    if (bullets.length === 1 && !text.includes('-') && !text.includes('•') && !text.includes('&bull;')) {
      return <span className={`leading-relaxed text-slate-700 ${className}`}>{bullets[0]}</span>;
    }

    return (
      <div className={`space-y-1 my-0.5 ${className}`}>
        {bullets.map((item, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-[11px] leading-snug">
            {/* The dash is fixed on the left; wrapped lines in flex-1 NEVER wrap under it */}
            <span
              className={`shrink-0 select-none font-bold text-indigo-600 leading-snug ${dashClassName}`}
            >
              -
            </span>
            <span className="flex-1 text-slate-700 leading-snug text-left">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // BULLETS ONLY MODE
  if (mode === 'bullets-only') {
    const bullets = splitKhmerBullets(text);

    if (bullets.length === 0) {
      return <span className="text-slate-400 italic">{emptyText}</span>;
    }

    return (
      <div className={`space-y-1.5 ${className}`}>
        {bullets.map((item, idx) => (
          <div key={idx} className="flex items-start gap-2 text-xs leading-relaxed">
            <span
              className={`shrink-0 select-none font-bold text-indigo-600 leading-relaxed ${dashClassName}`}
            >
              -
            </span>
            <span className="flex-1 text-slate-700 leading-relaxed text-justify">{item}</span>
          </div>
        ))}
      </div>
    );
  }

  // FULL MODE: Headers, Indented Paragraphs (ចូលកថាខណ្ឌ), and Hanging Indent Bullets (ទម្លាក់បន្ទាត់)
  const blocks = parseKhmerContentBlocks(text);

  if (blocks.length === 0) {
    return <span className="text-slate-400 italic">{emptyText}</span>;
  }

  return (
    <div className={`space-y-2.5 ${className}`}>
      {blocks.map((block, idx) => {
        // 1. Section Header (e.g. * ប្រវត្តិសង្ខេបរបស់សាលា និងថ្នាក់ដឹកនាំ៖)
        if (block.type === 'header') {
          return (
            <div
              key={idx}
              className="pt-2 pb-1 font-bold text-slate-900 text-xs sm:text-sm flex items-center gap-2 border-b border-slate-100"
            >
              <span className="w-1.5 h-3.5 bg-indigo-600 rounded-full inline-block shrink-0"></span>
              <span>{block.text}</span>
            </div>
          );
        }

        // 2. Hanging Indent Bullet Point
        // Dash on the left; wrapped text starts flush with first word, never under '-'
        if (block.type === 'bullet') {
          return (
            <div
              key={idx}
              className="flex items-start gap-2.5 text-xs sm:text-[13px] leading-relaxed pl-1"
            >
              <span
                className={`shrink-0 select-none font-bold text-indigo-600 text-sm leading-relaxed ${dashClassName}`}
              >
                -
              </span>
              <span className="flex-1 text-slate-700 leading-relaxed text-justify">
                {block.text}
              </span>
            </div>
          );
        }

        // 3. Regular Narrative Paragraph (ការចូលកថាខណ្ឌ យ៉ាងស្អាត)
        return (
          <p
            key={idx}
            className={`indent-6 sm:indent-8 leading-relaxed text-slate-700 text-justify text-xs sm:text-[13px] ${paragraphClassName}`}
          >
            {block.text}
          </p>
        );
      })}
    </div>
  );
};
