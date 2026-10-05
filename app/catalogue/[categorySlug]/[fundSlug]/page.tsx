import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueSection } from "@/components/catalogue/catalogue-section";
import { ProductDetailView } from "@/components/catalogue/components/product-detail-view";
import { resolveCategoryAccentFromOrder } from "@/components/catalogue/utils/catalogue-data";
import { getAllCatalogueFundSlugs, getCatalogueFund } from "@/lib/sanity";

export const dynamic = "force-static";

interface FundPageProps {
  params: Promise<{ categorySlug: string; fundSlug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCatalogueFundSlugs();
  return slugs.map(({ categorySlug, fundSlug }) => ({ categorySlug, fundSlug }));
}

export async function generateMetadata({
  params,
}: FundPageProps): Promise<Metadata> {
  const { categorySlug, fundSlug } = await params;
  const context = await getCatalogueFund(categorySlug, fundSlug);
  if (!context) return { title: "Product Not Found" };

  return {
    title: `${context.fund.fundName} | ${context.category.title} | Laksh Capital`,
    description:
      context.fund.description ||
      `View details for ${context.fund.fundName} in ${context.category.title}.`,
  };
}

export default async function FundPage({ params }: FundPageProps) {
  const { categorySlug, fundSlug } = await params;
  const context = await getCatalogueFund(categorySlug, fundSlug);

  if (!context) notFound();

  const accent = resolveCategoryAccentFromOrder(context.category.order);

  return (
    <CatalogueSection>
      <ProductDetailView
        fund={context.fund}
        categoryTitle={context.category.title}
        categoryImage={
          context.category.fundImage || "/assets/services/wealth-management.jpeg"
        }
        categorySlug={categorySlug}
        accent={accent}
      />
    </CatalogueSection>
  );
}
