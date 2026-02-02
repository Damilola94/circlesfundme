"use client";

import * as React from "react";
import { createPortal } from "react-dom";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ open, onOpenChange, children }) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };
    if (open) {
      document.addEventListener("keydown", handleEscape);
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onOpenChange]);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="fixed top-0 left-0 w-screen h-screen z-50 flex items-center justify-center bg-black/50 overflow-y-auto"
      onClick={() => onOpenChange(false)} 
    >
      <div
        className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md my-8"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} 
      >
        {children}
      </div>
    </div>,
    document.body
  );
};

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}
export const DialogContent: React.FC<DialogContentProps> = ({ children, className }) => {
  return <div className={className}>{children}</div>;
};

interface DialogHeaderProps {
  children: React.ReactNode;
}
export const DialogHeader: React.FC<DialogHeaderProps> = ({ children }) => (
  <div className="mb-4">{children}</div>
);

interface DialogTitleProps {
  children: React.ReactNode;
}
export const DialogTitle: React.FC<DialogTitleProps> = ({ children }) => (
  <h2 className="text-xl font-semibold ff-regular">{children}</h2>
);

interface DialogDescriptionProps {
  children: React.ReactNode;
}
export const DialogDescription: React.FC<DialogDescriptionProps> = ({ children }) => (
  <p className="text-sm text-gray-500">{children}</p>
);

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const DialogFooter: React.FC<DialogFooterProps> = ({ children, className }) => (
  <div className={`flex justify-end space-x-2 mt-4 ${className || ""}`}>{children}</div>
);
