import { ReactNode, isValidElement, cloneElement, ReactElement } from "react";

/* -------------------- Czech orphan fix helpers -------------------- */

const NBSP = "\u00A0";
// Replace a regular space after a single-letter Czech word.
const ORPHAN_REGEX = /\b([KkSsVvZzAaIiOoUu])\s+(?=\S)/g;
const bindCzechOrphansInString = (text: string) => text.replace(ORPHAN_REGEX, `$1${NBSP}`);

// Process an array of nodes, fixing inside strings and across sibling boundaries.
// Works even when markup splits the pair (e.g., "v " + <strong>oblasti</strong>).
function processChildrenArray(nodes: ReactNode[]): ReactNode[] {
  const firstPass = nodes.map(processNode); // recursive
  const out: ReactNode[] = [];

  for (let i = 0; i < firstPass.length; i++) {
    const current = firstPass[i];
    const prev = out.length ? out[out.length - 1] : null;

    if (typeof prev === "string") {
      const prevEndsWithSingle = /\b([KkSsVvZzAaIiOoUu])\s*$/.test(prev);
      if (prevEndsWithSingle) {
        // If current is a string, trim its leading spaces and join with NBSP.
        if (typeof current === "string") {
          const trimmedNext = current.replace(/^\s+/, "");
          const prevTrimmed = prev.replace(/\s+$/, "");
          out[out.length - 1] = prevTrimmed;
          out.push(NBSP, trimmedNext);
          continue;
        }
        // If current is an element, insert NBSP as its own text node.
        out[out.length - 1] = prev.replace(/\s+$/, "");
        out.push(NBSP, current);
        continue;
      }
    }

    out.push(current);
  }

  return out;
}

function processNode(node: ReactNode): ReactNode {
  if (typeof node === "string") {
    return bindCzechOrphansInString(node);
  }
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    const processed = Array.isArray(el.props.children)
      ? processChildrenArray(el.props.children)
      : processNode(el.props.children);

    return cloneElement(el, { children: processed });
  }
  return node;
}

// Main function to apply Czech orphan fix to any React node
export const applyCzechOrphanFix = (node: ReactNode): ReactNode => {
  return processNode(node);
};

// Function specifically for strings
export const fixCzechOrphansInString = (text: string): string => {
  return bindCzechOrphansInString(text);
};

/* -------------------- English orphan fix helpers -------------------- */

// Replace a regular space after English articles, short prepositions, and common words
const ENGLISH_ORPHAN_REGEX = /\b([Aa]n?|[Tt]he|[Oo]f|[Ii]n|[Oo]n|[Aa]t|[Tt]o|[Ff]or|[Ww]ith|[Bb]y|[Ff]rom|[Uu]p|[Dd]own|[Oo]ut|[Oo]ver|[Uu]nder|[Aa]bout|[Aa]round|[Bb]etween|[Aa]mong|[Aa]gainst|[Tt]hrough|[Aa]cross|[Bb]eyond|[Bb]ehind|[Bb]efore|[Aa]fter|[Dd]uring|[Bb]esides|[Ii]nstead|[Aa]lthough|[Bb]ecause|[Uu]nless|[Uu]ntil|[Ss]ince|[Ww]hile|[Ww]hen|[Ww]here|[Ww]hy|[Hh]ow|[Ww]hat|[Ww]ho|[Ww]hich|[Ww]hose|[Ww]hom|[Tt]hat|[Tt]his|[Tt]hese|[Tt]hose|[Aa]ll|[Bb]oth|[Ee]ach|[Ee]very|[Ss]ome|[Aa]ny|[Nn]o|[Mm]any|[Mm]uch|[Ll]ittle|[Ff]ew|[Ss]everal|[Mm]ost|[Ee]ither|[Nn]either|[Oo]ne|[Tt]wo|[Tt]hree|[Ff]our|[Ff]ive|[Ss]ix|[Ss]even|[Ee]ight|[Nn]ine|[Tt]en)\s+(?=\S)/g;

const bindEnglishOrphansInString = (text: string) => text.replace(ENGLISH_ORPHAN_REGEX, `$1${NBSP}`);

// Function specifically for English strings
export const fixEnglishOrphansInString = (text: string): string => {
  return bindEnglishOrphansInString(text);
};
