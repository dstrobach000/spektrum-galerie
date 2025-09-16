import React, { ReactNode, ReactElement, isValidElement, cloneElement, Children } from "react";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";
import ExhibitionHeaderClient from "@/components/Layout/Exhibition/ExhibitionHeaderClient";
import ExhibitionNameCard from "@/components/Layout/Exhibition/ExhibitionNameCard";
import ExhibitionText from "@/components/Layout/Exhibition/ExhibitionText";
import ExGaLandscape from "@/components/Layout/Exhibition/ExGaLandscape";
import ExGaPortrait from "@/components/Layout/Exhibition/ExGaPortrait";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Exhibition } from "@/types/Exhibition";

/* -------------------- Czech orphan fix helpers (for PortableText) -------------------- */

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
  if (typeof node === "string") return bindCzechOrphansInString(node);
  if (Array.isArray(node)) return processChildrenArray(node);
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (el.props?.children == null) return el;
    const kids = Children.toArray(el.props.children);
    const processed = processChildrenArray(kids);
    return cloneElement(el, { children: processed });
  }
  return node;
}

// PortableText components: apply orphan fixing to paragraph blocks and list items.
const ptComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{processNode(children)}</p>,
  },
  listItem: {
    bullet: ({ children }) => <li>{processNode(children)}</li>,
    number: ({ children }) => <li>{processNode(children)}</li>,
  },
};

/* --------------------------------- Page content --------------------------------- */

const ExhibitionContent = ({ exhibition }: { exhibition: Exhibition }) => {
  return (
    <div className="max-w-4xl mx-auto w-full relative">
      <div className="border border-black rounded-xl p-6 relative">
        <div className="flex flex-col gap-12">
          {/* Logo */}
          <div className="border border-black rounded-full w-full leading-none min-h-[150px] md:min-h-0 flex items-center justify-center aspect-[3/1]">
            <RotatingLogo3D src="/3D/logo.glb" className="block w-full h-auto" />
          </div>

          {/* Header */}
          <ExhibitionHeaderClient
            currentSlug={exhibition.slug}
            artist={exhibition.artist}
            exhibitionName={exhibition.title}
            startDate={exhibition.startDate}
            endDate={exhibition.endDate}
          />

          {/* Intro + Main text */}
          {(exhibition.intro || exhibition.mainText) && (
            <div className="flex flex-col">
              {exhibition.intro && (
                <ExhibitionText variant="bordered" spacing="sm" className="mb-0 text-lg">
                  <PortableText value={exhibition.intro} components={ptComponents} />
                </ExhibitionText>
              )}
              {exhibition.mainText && (
                <ExhibitionText spacing="md" tightBottom className="mt-4 text-lg">
                  <PortableText value={exhibition.mainText} components={ptComponents} />
                </ExhibitionText>
              )}
            </div>
          )}

          {/* Landscape images */}
          {!!exhibition.landscapeImages?.length && (
            <div className="w-full">
              <ExGaLandscape images={exhibition.landscapeImages} />
            </div>
          )}

          {/* Landscape videos */}
          {!!exhibition.landscapeVideos?.length &&
            exhibition.landscapeVideos.map((video, idx) =>
              video?.asset?.url ? (
                <div key={idx} className="w-full">
                  <video controls style={{ width: "100%" }} src={video.asset.url} />
                  {video.caption && <div className="text-sm text-center mt-1">{video.caption}</div>}
                </div>
              ) : null
            )}

          {/* Bio + Portraits */}
          {(exhibition.bio?.length ||
            exhibition.portraitImages?.length ||
            exhibition.portraitVideos?.length) && (
            <div className="flex flex-col md:flex-row gap-12 md:gap-6 md:items-stretch">
              <div className="md:w-1/2 h-full flex flex-col">
                {exhibition.bio && (
                  <ExhibitionText variant="bordered" spacing="sm" className="mb-0">
                    <PortableText value={exhibition.bio} components={ptComponents} />
                  </ExhibitionText>
                )}
              </div>

              <div className="md:w-1/2 flex flex-col gap-4 bg-white p-0">
                <ExGaPortrait images={exhibition.portraitImages || []} />
                {exhibition.portraitVideos &&
                  exhibition.portraitVideos.map((video, idx) =>
                    video?.asset?.url ? (
                      <div key={idx} className="w-full">
                        <video controls style={{ width: "100%" }} src={video.asset.url} />
                        {video.caption && (
                          <div className="text-sm text-center mt-1">{video.caption}</div>
                        )}
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          )}

          {/* Namecard */}
          <ExhibitionNameCard
            namecard={exhibition.namecard || []}
            graphic={exhibition.poster?.asset}
          />
        </div>
      </div>

      <div className="h-6" />
    </div>
  );
};

export default ExhibitionContent;
