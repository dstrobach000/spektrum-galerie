"use client";

import React, { useEffect } from "react";
import StickyCloseButton from "./StickyCloseButton";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  fullscreen?: boolean;
  noPadding?: boolean;
  closeOnBackdropClick?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  fullscreen = false,
  noPadding = false,
  closeOnBackdropClick = true, // default true, but you will now pass false
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white text-black overflow-y-auto overscroll-contain ${
        fullscreen
          ? "p-0 pb-8"
          : noPadding
          ? "p-0 pb-8"
          : "p-6 pb-8"
      }`}
      style={{ WebkitOverflowScrolling: "touch", touchAction: "auto" }}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      <StickyCloseButton onClick={onClose} />
      <div
        className={`mx-auto h-full ${
          fullscreen
            ? "bg-white"
            : "w-full max-w-4xl bg-transparent shadow-none border-none p-0 h-full"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="font-light text-base">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
