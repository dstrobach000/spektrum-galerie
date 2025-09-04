import { NextResponse } from "next/server";
import { sanityClient } from "@/sanity/client";

export async function GET() {
  const data = await sanityClient.fetch(
    `*[_type == "exhibition"] | order(startDate desc){
      "slug": slug.current, artist, title, startDate, endDate
    }`
  );
  return NextResponse.json(data);
}
