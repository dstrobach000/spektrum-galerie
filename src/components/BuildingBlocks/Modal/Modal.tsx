"use client";

import React, { useEffect } from "react";
import StickyCloseButton from "@/components/BuildingBlocks/Buttons/StickyCloseButton";

// --- Scroll lock counter logic (unchanged) ---
let modalOpenCount = 0;

const lockScroll = () => {
  if (modalOpenCount === 0) {
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "contain";
    
    // iOS Safari specific: hide only the main content, not everything
    const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);
    if (isIOSSafari) {
      // Hide only the main page content, not the modal
      const mainContent = document.querySelector('main, #__next > div:first-child');
      if (mainContent) {
        (mainContent as HTMLElement).style.visibility = "hidden";
      }
      // Also hide any sections that might be visible
      const sections = document.querySelectorAll('section:not([class*="modal"])');
      sections.forEach(section => {
        (section as HTMLElement).style.visibility = "hidden";
      });
    }
  }
  modalOpenCount++;
};

const unlockScroll = () => {
  modalOpenCount = Math.max(modalOpenCount - 1, 0);
  if (modalOpenCount === 0) {
    document.body.style.overflow = "";
    document.body.style.overscrollBehavior = "";
    
    // iOS Safari specific: restore content
    const isIOSSafari = /iPad|iPhone|iPod/.test(navigator.userAgent) && /Safari/.test(navigator.userAgent);
    if (isIOSSafari) {
      const mainContent = document.querySelector('main, #__next > div:first-child');
      if (mainContent) {
        (mainContent as HTMLElement).style.visibility = "";
      }
      const sections = document.querySelectorAll('section:not([class*="modal"])');
      sections.forEach(section => {
        (section as HTMLElement).style.visibility = "";
      });
    }
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
      className={`fixed inset-0 z-50 bg-white text-black overscroll-contain ${
        fullscreen ? "p-0" : noPadding ? "p-0" : "p-0"
      }`}
      style={{ 
        WebkitOverflowScrolling: "touch", 
        touchAction: "auto",
        // Additional iOS Safari fixes
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        width: '100vw',
        height: '100vh',
        minHeight: '100vh',
        maxHeight: '100vh',
        // Prevent content bleeding through
        isolation: 'isolate',
        zIndex: 9999, // Much higher z-index
        // Ensure proper stacking context
        WebkitTransform: 'translate3d(0, 0, 0)',
        transform: 'translate3d(0, 0, 0)',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        // Force full viewport coverage
        margin: 0,
        padding: 0,
        // Allow scrolling within the modal
        overflow: 'auto',
        // Force hardware acceleration
        willChange: 'transform',
        // Prevent any content from showing through
        backgroundColor: 'white'
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
              : "w-full bg-transparent shadow-none border-none pt-6 px-6 h-full"
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
