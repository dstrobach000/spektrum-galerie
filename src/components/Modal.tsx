"use client";

import React, { useEffect } from "react";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  fullscreen?: boolean;
};

const Modal = ({ isOpen, onClose, title, children, fullscreen = false }: ModalProps) => {
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

  const hasTitle = Boolean(title && title.trim().length > 0);

  return (
    <div
      className={`fixed inset-0 z-50 bg-white text-black overflow-y-auto overscroll-contain ${
        fullscreen ? "p-10" : "p-6"
      }`}
      style={{ WebkitOverflowScrolling: "touch", touchAction: "auto" }}
    >
      {hasTitle && (
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-3xl font-bold"
        >
          ×
        </button>
      )}
      <div
        className={`mx-auto ${
          fullscreen
            ? "bg-white"
            : hasTitle
            ? "max-w-lg w-full p-6 rounded border border-black shadow-lg bg-white relative"
            : "w-full max-w-xl bg-transparent shadow-none border-none p-0"
        }`}
      >
        {hasTitle && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        <div className="font-light text-base">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
