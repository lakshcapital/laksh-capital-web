import { createClient } from "@sanity/client";

export const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2026-05-16",
  useCdn: false,
});

export interface FundData {
  _id: string;
  fundName: string;
  schemeCode?: string;
  description?: string;
  tags?: string[];
  imageUrl?: string;
  baseReturnRate?: number;
  bonusRate?: number;
  liveNav?: string;
  liveNavDate?: string;
}

export interface CategoryWithFunds {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  funds: FundData[];
  fundImage?: string;
  tags?: string[];
}

export async function getCatalogueConfig(): Promise<CategoryWithFunds[]> {
  const query = `*[_type == "category" && isActive == true] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    "fundImage": fundImage.asset->url,
    tags,
    "funds": *[_type == "fund" && references(^._id) && isActive == true] | order(displayOrder asc) {
      _id,
      fundName,
      schemeCode,
      description,
      tags,
      baseReturnRate,
      bonusRate,
      "imageUrl": fundImage.asset->url
    }
  }`;

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?query=${encodeURIComponent(query)}`,
    { next: { tags: ["catalogue-cache"] } }
  );

  const data = await res.json();
  return data.result || [];
}