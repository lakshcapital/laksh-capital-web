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
  slug: string;
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
  order?: number;
  funds: FundData[];
  fundImage?: string;
  tags?: string[];
}

export interface CatalogueFundContext {
  category: CategoryWithFunds;
  fund: FundData;
}

const FUND_FIELDS = `
  _id,
  fundName,
  "slug": slug.current,
  schemeCode,
  description,
  tags,
  baseReturnRate,
  bonusRate,
  "imageUrl": fundImage.asset->url
`;

const CATEGORY_FIELDS = `
  _id,
  title,
  "slug": slug.current,
  description,
  "fundImage": fundImage.asset->url,
  tags,
  order
`;

const CATEGORY_WITH_FUNDS_FIELDS = `
  ${CATEGORY_FIELDS},
  "funds": *[_type == "fund" && references(^._id) && isActive == true] | order(displayOrder asc) {
    ${FUND_FIELDS}
  }
`;

async function fetchCatalogueQuery<T>(query: string, params?: Record<string, string>): Promise<T> {
  const searchParams = new URLSearchParams({ query });
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      searchParams.set(`$${key}`, JSON.stringify(value));
    });
  }

  const res = await fetch(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/production?${searchParams.toString()}`,
    { next: { tags: ["catalogue-cache"] } }
  );
  const data = await res.json();
  return data.result;
}

export async function getCatalogueConfig(): Promise<CategoryWithFunds[]> {
  const query = `*[_type == "category" && isActive == true] | order(order asc) {
    ${CATEGORY_WITH_FUNDS_FIELDS}
  }`;
  return (await fetchCatalogueQuery<CategoryWithFunds[]>(query)) || [];
}

export async function getCatalogueCategory(slug: string): Promise<CategoryWithFunds | null> {
  const query = `*[_type == "category" && isActive == true && slug.current == $slug][0] {
    ${CATEGORY_WITH_FUNDS_FIELDS}
  }`;
  return fetchCatalogueQuery<CategoryWithFunds | null>(query, { slug });
}

export async function getCatalogueFund(
  categorySlug: string,
  fundSlug: string
): Promise<CatalogueFundContext | null> {
  const query = `*[_type == "category" && isActive == true && slug.current == $categorySlug][0] {
    ${CATEGORY_FIELDS},
    "fund": *[_type == "fund" && references(^._id) && isActive == true && slug.current == $fundSlug][0] {
      ${FUND_FIELDS}
    }
  }`;

  const result = await fetchCatalogueQuery<{
    _id: string;
    title: string;
    slug: string;
    description?: string;
    fundImage?: string;
    tags?: string[];
    fund: FundData | null;
  } | null>(query, { categorySlug, fundSlug });

  if (!result?.fund) return null;

  const { fund, ...categoryFields } = result;
  return {
    category: { ...categoryFields, funds: [] },
    fund,
  };
}

export async function getAllCatalogueCategorySlugs(): Promise<{ slug: string }[]> {
  const query = `*[_type == "category" && isActive == true && defined(slug.current)] { "slug": slug.current }`;
  return (await fetchCatalogueQuery<{ slug: string }[]>(query)) || [];
}

export async function getAllCatalogueFundSlugs(): Promise<
  { categorySlug: string; fundSlug: string }[]
> {
  const query = `*[_type == "category" && isActive == true && defined(slug.current)] {
    "categorySlug": slug.current,
    "fundSlugs": *[_type == "fund" && references(^._id) && isActive == true && defined(slug.current)] {
      "slug": slug.current
    }
  }`;

  const categories =
    (await fetchCatalogueQuery<
      { categorySlug: string; fundSlugs: { slug: string }[] }[]
    >(query)) || [];

  return categories.flatMap((category) =>
    category.fundSlugs.map((fund) => ({
      categorySlug: category.categorySlug,
      fundSlug: fund.slug,
    }))
  );
}
