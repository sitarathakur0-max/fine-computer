import React from 'react';

/**
 * Exactly ONE floating WhatsApp button fixed to the bottom-left corner.
 * Verified business number: +92 302 7644344 -> wa.me/923027644344
 * Completely image-free and SVG-free: crafted with CSS, typography, and unicode.
 * Visible on every page. No other WhatsApp links exist on the site.
 */
export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Quick WhatsApp contact"
      className="fixed bottom-6 left-6 z-50 flex items-center"
    >
      <a
        href="https://wa.me/923027644344"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp message to Fine Computer at +92 302 7644344"
        className="group flex items-center gap-2.5 px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] active:scale-95 text-slate-950 font-semibold text-xs tracking-wide shadow-lg shadow-black/40 transition-all duration-150 border border-[#1ebd53] cursor-pointer"
      >
        {/* CSS-only icon representation - ZERO SVG */}
        <span
          aria-hidden="true"
          className="w-2.5 h-2.5 rounded-full bg-slate-950 inline-block shrink-0"
        />
        <span className="whitespace-nowrap font-mono font-bold uppercase">
          WhatsApp: +92 302 7644344
        </span>
      </a>
    </aside>
  );
};
