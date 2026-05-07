"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Link } from "@/i18n/navigation";

export type NavDropdownItem = {
  key: string;
  label: string;
  href: string;
};

type NavDropdownProps = {
  label: string;
  items: NavDropdownItem[];
  active?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  triggerHref?: string;
  triggerClassName?: string;
  underlineClassName?: string;
  panelClassName?: string;
  itemClassName?: string;
};

const HOVER_CLOSE_DELAY_MS = 120;

export function NavDropdown({
  label,
  items,
  active = false,
  open: controlledOpen,
  onOpenChange,
  triggerHref,
  triggerClassName = "",
  underlineClassName = "",
  panelClassName = "",
  itemClassName = "",
}: NavDropdownProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const setOpen = (next: boolean) => {
    if (!isControlled) setUncontrolledOpen(next);
    onOpenChange?.(next);
  };

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<number | null>(null);
  const menuId = useId();

  const cancelClose = () => {
    if (closeTimerRef.current !== null) {
      window.clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const scheduleClose = () => {
    cancelClose();
    closeTimerRef.current = window.setTimeout(() => {
      setOpen(false);
    }, HOVER_CLOSE_DELAY_MS);
  };

  const onMouseEnter = () => {
    cancelClose();
    setOpen(true);
  };

  const onMouseLeave = () => {
    scheduleClose();
  };

  useEffect(() => {
    return () => cancelClose();
  }, []);

  useEffect(() => {
    if (!open) return;

    const handleMouseDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
    // setOpen is stable for our purposes — re-running on every render would re-bind listeners needlessly
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const showUnderline = active || open;

  const labelContent = (
    <span className="group relative inline-block">
      {label}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ease-out ${
          showUnderline ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
        } ${underlineClassName}`}
      />
    </span>
  );

  const chevron = (
    <span
      aria-hidden="true"
      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-200 ${
        open ? "rotate-90" : ""
      }`}
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-2.5 w-2.5">
        <path
          d="M9 6l6 6-6 6"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {triggerHref ? (
        <div className={`inline-flex items-center gap-2 ${triggerClassName}`}>
          <Link href={triggerHref} className="inline-block">
            {labelContent}
          </Link>
          <button
            type="button"
            ref={triggerRef}
            onClick={() => setOpen(!open)}
            aria-haspopup="menu"
            aria-expanded={open}
            aria-controls={menuId}
            aria-label={`${label} – abrir menu`}
            className="inline-flex"
          >
            {chevron}
          </button>
        </div>
      ) : (
        <button
          type="button"
          ref={triggerRef}
          onClick={() => setOpen(!open)}
          aria-haspopup="menu"
          aria-expanded={open}
          aria-controls={menuId}
          className={`inline-flex items-center gap-2 ${triggerClassName}`}
        >
          {labelContent}
          {chevron}
        </button>
      )}

      <div
        id={menuId}
        role="menu"
        aria-label={label}
        aria-hidden={!open}
        className={`absolute left-0 top-full mt-3 min-w-[18rem] origin-top shadow-lg transition-[opacity,transform] duration-200 ease-out ${panelClassName} ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0"
        }`}
      >
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            role="menuitem"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            className={`block px-6 py-4 text-base font-semibold transition-colors focus-visible:outline-none ${itemClassName}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
