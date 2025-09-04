// src/types/Press.ts

/** Raw link shape coming back from GROQ */
export interface SanityPressLink {
  label?: string;
  note?: string;
  /** Resolved from: file.asset->url */
  fileUrl?: string | null;
  /** Optional external URL */
  url?: string | null;
}

/** Whole Press / Downloads document */
export interface PressDoc {
  title?: string;
  links?: SanityPressLink[];
}

/** UI-friendly link shape consumed by your React components */
export interface PressLinkUI {
  label: string;
  href: string;
}
