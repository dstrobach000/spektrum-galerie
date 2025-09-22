"use client";

import React, { useEffect } from "react";
import StickyCloseButton from "@/components/BuildingBlocks/Buttons/StickyCloseButton";

// --- Scroll lock counter logic (unchanged) ---
let modalOpenCount = 0;

const lockScroll = () => {
  if (modalOpenCount === 0) {
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
  }
  modalOpenCount++;
};

const unlockScroll = () => {
  modalOpenCount = Math.max(modalOpenCount - 1, 0);
  if (modalOpenCount === 0) {
    document.body.style.overflow = "";
    document.body.style.overscrollBehavior = "";
  }
};
// ---------------------------------------------

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;            // we now call this from the sticky button
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
  closeOnBackdropClick = true,
}: ModalProps) => {
  useEffect(() => {
    if (isOpen) lockScroll();
    return () => {
      if (isOpen) unlockScroll();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-white text-black overflow-y-auto overscroll-contain modal-backdrop-ios26 ${
        fullscreen ? "p-0 pb-8" : noPadding ? "p-0 pb-8" : "p-0 pb-8"
      }`}
      style={{ 
        WebkitOverflowScrolling: "touch", 
        touchAction: "auto",
        // iOS 26 liquid glass interface fixes
        backdropFilter: "blur(0px)",
        WebkitBackdropFilter: "blur(0px)",
        isolation: "isolate",
        transform: "translateZ(0)",
        WebkitTransform: "translateZ(0)",
        willChange: "transform",
        // Ensure solid background on iOS 26
        backgroundColor: "rgb(255, 255, 255)"
      }}
      onClick={closeOnBackdropClick ? onClose : undefined}
    >
      {/* Single, unified close button, calls onClose provided by the page */}
      <StickyCloseButton onClick={onClose} />

      {/* Prevent clicks on contents from closing via backdrop */}
      <div onClick={(e) => e.stopPropagation()}>
        <div
          className={`mx-auto h-full relative ${
            fullscreen
              ? "bg-white"
              : "w-full bg-transparent shadow-none border-none p-6 pb-8 h-full"
          }`}
          style={fullscreen ? {} : { maxWidth: '896px', margin: '0 auto', width: '100%' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="font-light text-base">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
