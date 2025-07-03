"use client";

import React from "react";
import GlowButton from "./GlowButton";

interface UpcomingProps {
  artist: string;
  exhibition: string;
  date: string;
}

const Upcoming: React.FC<UpcomingProps> = ({ artist, exhibition, date }) => {
  return (
    <>
      <section className="my-12 px-6 sm:px-10">
        <GlowButton
          className="w-full py-4 text-xl font-light uppercase"
          glowColor="bg-[#a3f730]"
        >
          <div className="upcoming-content w-full text-sm md:text-xl font-light uppercase gap-1 px-2 md:px-6">
            <span className="w-full upcoming-item text-center">Připravujeme:</span>
            <span className="w-full upcoming-item text-center pulse-text">
              {artist} – {exhibition}
            </span>
            <span className="w-full upcoming-item text-center">{date}</span>
          </div>
        </GlowButton>
      </section>

      <style jsx>{`
        .pulse-text {
          display: inline-block;
          animation: pulseScale 2s ease-in-out infinite;
        }

        @keyframes pulseScale {
          0%, 100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.1);
          }
        }

        .upcoming-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        @media (min-width: 1050px) {
          .upcoming-content {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
            text-align: left;
          }

          .upcoming-item {
            width: auto;
            text-align: left;
          }
        }
      `}</style>
    </>
  );
};

export default Upcoming;
