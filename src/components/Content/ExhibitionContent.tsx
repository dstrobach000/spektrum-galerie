"use client";

import React from "react";
import RotatingLogo3D from "@/components/BuildingBlocks/Logo/RotatingLogo3D";
import ExhibitionHeaderClient from "@/components/Layout/Exhibition/ExhibitionHeaderClient";
import ExhibitionNameCard from "@/components/Layout/Exhibition/ExhibitionNameCard";
import ExhibitionText from "@/components/Layout/Exhibition/ExhibitionText";
import ExGaLandscape from "@/components/Layout/Exhibition/ExGaLandscape";
import ExGaPortrait from "@/components/Layout/Exhibition/ExGaPortrait";
import { PortableText } from "@portabletext/react";
import { Exhibition } from "@/types/Exhibition";

const ExhibitionContent = ({ exhibition }: { exhibition: Exhibition }) => {
  return (
    <div className="max-w-4xl mx-auto w-full relative">
      <div className="border border-black rounded-xl p-6 relative">
        <div className="flex flex-col gap-12">
          {/* Logo */}
          <div className="border border-black rounded-full w-full leading-none min-h-[150px] md:min-h-0 flex items-center justify-center aspect-[3/1]">
            <RotatingLogo3D src="/3D/logo.glb" speed={10} className="block w-full h-auto" />
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
                  <PortableText value={exhibition.intro} />
                </ExhibitionText>
              )}
              {exhibition.mainText && (
                <ExhibitionText spacing="md" className="mt-4 text-lg">
                  <PortableText value={exhibition.mainText} />
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
            <div className="flex flex-col md:flex-row gap-6 md:items-stretch">
              <div className="md:w-1/2 h-full flex flex-col">
                {exhibition.bio && (
                  <ExhibitionText variant="bordered" spacing="sm" className="mb-0">
                    <PortableText value={exhibition.bio} />
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
