"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function TitleSetter() {
  const pathname = usePathname();

  useEffect(() => {
    // Only set title on client side to prevent hydration mismatches
    if (typeof window === 'undefined') return;
    
    // Set the title based on the current path
    let title = 'Spektrum galerie';
    
    if (pathname === '/press') {
      title = 'Ke stažení | Spektrum galerie';
    } else if (pathname === '/kontakt') {
      title = 'Kontakty | Spektrum galerie';
    } else if (pathname === '/privacy') {
      title = 'Zásady ochrany osobních údajů | Spektrum galerie';
    } else if (pathname.startsWith('/exhibition/')) {
      // For exhibition pages, we need to extract the slug and fetch the title
      // For now, we'll use a generic title that will be updated by the modal
      title = 'Výstava | Spektrum galerie';
    }
    
    document.title = title;
  }, [pathname]);

  return null;
}

// Hook to update title from modal components
export function useUpdateTitle(title: string) {
  useEffect(() => {
    // Only set title on client side to prevent hydration mismatches
    if (typeof window === 'undefined' || !title) return;
    
    document.title = title;
  }, [title]);
}
