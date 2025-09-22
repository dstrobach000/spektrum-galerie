import React, { ReactNode, ReactElement, isValidElement, cloneElement, Children, useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import ExhibitionHeaderClient from "@/components/Layout/Exhibition/ExhibitionHeaderClient";
import ExhibitionNameCard from "@/components/Layout/Exhibition/ExhibitionNameCard";
import ExhibitionText from "@/components/Layout/Exhibition/ExhibitionText";
import ExGaLandscape from "@/components/Layout/Exhibition/ExGaLandscape";
import ExGaPortrait from "@/components/Layout/Exhibition/ExGaPortrait";
import GlowButton from "@/components/BuildingBlocks/Buttons/GlowButton";
import { PortableText, PortableTextComponents } from "@portabletext/react";
import { Exhibition } from "@/types/Exhibition";

// Dynamically import the 3D logo to reduce initial bundle size
const RotatingLogo3D = dynamic(() => import("@/components/BuildingBlocks/Logo/RotatingLogo3D"), {
  loading: () => <div className="w-full h-full bg-gray-100 animate-pulse" />,
  ssr: false
});

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
  const [fullscreen, setFullscreen] = useState(false);

  // Keyboard: allow Esc to close while fullscreen
  useEffect(() => {
    if (!fullscreen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false);
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullscreen]);

  // Lock page scroll while overlay is open
  useEffect(() => {
    if (!fullscreen) return;

    const scrollY = window.scrollY;
    const preventTouch = (e: TouchEvent) => e.preventDefault();

    Object.assign(document.body.style, {
      position: "fixed",
      top: `-${scrollY}px`,
      left: "0",
      right: "0",
      width: "100%",
      overflow: "hidden",
    } as CSSStyleDeclaration);
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("touchmove", preventTouch, { passive: false });

    return () => {
      document.removeEventListener("touchmove", preventTouch);
      Object.assign(document.body.style, {
        position: "",
        top: "",
        left: "",
        right: "",
        width: "",
        overflow: "",
      } as CSSStyleDeclaration);
      document.documentElement.style.overflow = "";
      window.scrollTo(0, scrollY);
    };
  }, [fullscreen]);

  return (
    <div className="w-full relative">
      <div className="border border-black rounded-xl p-6 relative max-w-4xl mx-auto">
        <div className="flex flex-col gap-6 md:gap-6">
          {/* Logo */}
          <div className="border border-black rounded-full w-full leading-none min-h-[150px] md:min-h-0 flex items-center justify-center aspect-[3/1]">
            <RotatingLogo3D src="/3D/spektrum_galerie_bevel.obj" className="block w-full h-auto" />
          </div>

          {/* Header */}
          <div className="mb-6 mt-6">
            <ExhibitionHeaderClient
              currentSlug={exhibition.slug}
              artist={exhibition.artist}
              exhibitionName={exhibition.title}
              startDate={exhibition.startDate}
              endDate={exhibition.endDate}
              isOneDayEvent={exhibition.isOneDayEvent}
            />
          </div>

          {/* Intro + Main text */}
          {(exhibition.intro || exhibition.mainText) && (
            <div className="flex flex-col">
              {exhibition.intro && (
                <ExhibitionText variant="bordered" spacing="sm" className="mb-0 text-lg">
                  <PortableText value={exhibition.intro} components={ptComponents} />
                </ExhibitionText>
              )}
              {exhibition.mainText && (
                <ExhibitionText spacing="sm" tightBottom className="mt-0 text-lg">
                  <PortableText value={exhibition.mainText} components={ptComponents} />
                </ExhibitionText>
              )}
            </div>
          )}

          {/* Landscape section: Gallery + Video side by side */}
          {exhibition.landscapeImages?.length && (
            <div className={`w-full ${exhibition.landscapeVideos?.length ? 'flex flex-col md:flex-row gap-6' : ''}`}>
              <div className={exhibition.landscapeVideos?.length ? 'md:w-1/2' : 'w-full'}>
                <ExGaLandscape images={exhibition.landscapeImages} />
              </div>
              {exhibition.landscapeVideos?.length && (
                <div className="md:w-1/2">
                  {exhibition.landscapeVideos.map((video, idx) =>
                    video?.asset?.url ? (
                      <div key={idx} className="w-full">
                        <video controls style={{ width: "100%" }} src={video.asset.url} />
                      </div>
                    ) : null
                  )}
                </div>
              )}
            </div>
          )}

          {/* Dynamic Alternating Flow Layout - Elements automatically alternate left/right */}
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2 flex flex-col gap-6">
              {(() => {
                // Create array of elements that exist, in order
                const elements = [];
                let index = 0;

                // Bio
                if (exhibition.bio) {
                  elements.push({
                    key: 'bio',
                    content: (
                      <ExhibitionText variant="bordered" spacing="sm" className="mb-0">
                        <PortableText value={exhibition.bio} components={ptComponents} />
                      </ExhibitionText>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Portrait Gallery
                if (exhibition.portraitImages?.length) {
                  elements.push({
                    key: 'portrait-gallery',
                    content: <ExGaPortrait images={exhibition.portraitImages} />,
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Portrait Video
                if (exhibition.portraitVideos?.length) {
                  elements.push({
                    key: 'portrait-video',
                    content: (
                      <div className="w-full">
                        {exhibition.portraitVideos.map((video, idx) =>
                          video?.asset?.url ? (
                            <div key={idx} className="w-full">
                              <video controls style={{ width: "100%" }} src={video.asset.url} />
                            </div>
                          ) : null
                        )}
                      </div>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Graphic
                if (exhibition.poster?.asset) {
                  elements.push({
                    key: 'graphic',
                    content: (
                      <div className="relative flex items-center justify-center">
                        <Image 
                          src={exhibition.poster.asset.url} 
                          alt="Exhibition graphic" 
                          width={800}
                          height={600}
                          className="w-full h-auto block" 
                          draggable={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <GlowButton
                            onClick={() => setFullscreen(true)}
                            glowColor="bg-[#a3f730]"
                            className="!px-2 !py-1"
                            floating={false}
                          >
                            <span className="text-sm font-light">⛶</span>
                            <span className="ml-2 font-light text-sm">full screen</span>
                          </GlowButton>
                        </div>
                      </div>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Namecard
                if (exhibition.namecard && exhibition.namecard.length > 0) {
                  elements.push({
                    key: 'namecard',
                    content: <ExhibitionNameCard namecard={exhibition.namecard} />,
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Filter and render only left elements
                return elements.filter(element => element.isLeft).map((element) => (
                  <div key={element.key} className="w-full">
                    {element.content}
                  </div>
                ));
              })()}
            </div>

            <div className="md:w-1/2 flex flex-col gap-6">
              {(() => {
                // Create array of elements that exist, in order
                const elements = [];
                let index = 0;

                // Bio
                if (exhibition.bio) {
                  elements.push({
                    key: 'bio',
                    content: (
                      <ExhibitionText variant="bordered" spacing="sm" className="mb-0">
                        <PortableText value={exhibition.bio} components={ptComponents} />
                      </ExhibitionText>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Portrait Gallery
                if (exhibition.portraitImages?.length) {
                  elements.push({
                    key: 'portrait-gallery',
                    content: <ExGaPortrait images={exhibition.portraitImages} />,
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Portrait Video
                if (exhibition.portraitVideos?.length) {
                  elements.push({
                    key: 'portrait-video',
                    content: (
                      <div className="w-full">
                        {exhibition.portraitVideos.map((video, idx) =>
                          video?.asset?.url ? (
                            <div key={idx} className="w-full">
                              <video controls style={{ width: "100%" }} src={video.asset.url} />
                            </div>
                          ) : null
                        )}
                      </div>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Graphic
                if (exhibition.poster?.asset) {
                  elements.push({
                    key: 'graphic',
                    content: (
                      <div className="relative flex items-center justify-center">
                        <Image 
                          src={exhibition.poster.asset.url} 
                          alt="Exhibition graphic" 
                          width={800}
                          height={600}
                          className="w-full h-auto block" 
                          draggable={false}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                          <GlowButton
                            onClick={() => setFullscreen(true)}
                            glowColor="bg-[#a3f730]"
                            className="!px-2 !py-1"
                            floating={false}
                          >
                            <span className="text-sm font-light">⛶</span>
                            <span className="ml-2 font-light text-sm">full screen</span>
                          </GlowButton>
                        </div>
                      </div>
                    ),
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Namecard
                if (exhibition.namecard && exhibition.namecard.length > 0) {
                  elements.push({
                    key: 'namecard',
                    content: <ExhibitionNameCard namecard={exhibition.namecard} />,
                    isLeft: index % 2 === 0
                  });
                  index++;
                }

                // Filter and render only right elements
                return elements.filter(element => !element.isLeft).map((element) => (
                  <div key={element.key} className="w-full">
                    {element.content}
                  </div>
                ));
              })()}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen overlay for graphic */}
      {fullscreen && exhibition.poster?.asset && (
        <div
          className="fixed inset-0 z-[100] bg-white grid"
          style={{ minHeight: "100dvh", gridTemplateRows: "1fr auto" }}
        >
          <div className="min-h-0 overflow-hidden flex items-center justify-center p-4 sm:p-8">
            <Image
              src={exhibition.poster.asset.url}
              alt="Exhibition graphic fullscreen"
              width={1200}
              height={800}
              className="block h-full w-auto max-w-full object-contain"
              draggable={false}
              sizes="100vw"
            />
          </div>

          <div className="p-4 sm:p-6 flex w-full max-w-2xl justify-center items-center mx-auto">
            <GlowButton
              onClick={() => setFullscreen(false)}
              glowColor="bg-[#a3f730]"
              className="!px-4 !py-2"
              floating={false}
            >
              <span className="font-light">Zavřít</span>
            </GlowButton>
          </div>
        </div>
      )}

      <div className="h-6" />
    </div>
  );
};

export default ExhibitionContent;
