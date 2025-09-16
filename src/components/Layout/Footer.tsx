import React, { forwardRef } from "react";
import Image from "next/image";
import FooterClient from "./FooterClient";

const Footer = forwardRef<HTMLElement, Record<string, never>>((props, ref) => {
  return (
    <footer
      ref={ref}
      className="border-t border-black bg-white px-6 sm:px-10 py-10 sm:py-6"
      id="footer"
    >
      <div className="max-w-7xl mx-auto">
        <FooterClient />

        <div className="mt-8 flex flex-col items-center w-full">
          <p className="text-sm font-light text-black text-center leading-snug mb-3">
            Děkujeme statutárnímu městu Brnu a Ministerstvu kultury České republiky za finanční
            podporu tohoto projektu.
          </p>
          <div className="flex gap-4 justify-center items-center">
            <Image
              src="/logos/ministerstvo_kultury.png"
              alt="Ministerstvo kultury"
              height={32}
              width={100}
              className="h-8 object-contain"
            />
            <Image
              src="/logos/brno.png"
              alt="Brno"
              height={32}
              width={100}
              className="h-12 object-contain"
            />
          </div>
          <p className="text-xs text-black font-light text-center mt-3">
            © Spektrum galerie 2025
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
