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
  triggerClassName?: string;
  underlineClassName?: string;
  panelClassName?: string;
  itemClassName?: string;
};

export function NavDropdown({
  label,
  items,
  active = false,
  open: controlledOpen,
  onOpenChange,
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
  const menuId = useId();

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

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => setOpen(!open)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={`group relative inline-flex items-center gap-1 ${triggerClassName}`}
      >
        <span>{label}</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 12"
          className={`h-3 w-3 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path
            d="M2.5 4.5 6 8l3.5-3.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-x-0 -bottom-0.5 h-[2px] origin-left transition-transform duration-300 ease-out ${
            showUnderline ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
          } ${underlineClassName}`}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label={label}
          className={`absolute left-0 top-full mt-3 min-w-[14rem] rounded-lg py-2 shadow-lg ring-1 ${panelClassName}`}
        >
          {items.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              role="menuitem"
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm transition-colors focus-visible:outline-none ${itemClassName}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
