import { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogueSection } from "@/components/catalogue/catalogue-section";
import { CategoryWorkspace } from "@/components/catalogue/category-workspace";
import { resolveCategoryAccentFromOrder } from "@/components/catalogue/utils/catalogue-data";
import { getAllCatalogueCategorySlugs, getCatalogueCategory } from "@/lib/sanity";

export const dynamic = "force-static";

interface CategoryPageProps {
  params: Promise<{ categorySlug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCatalogueCategorySlugs();
  return slugs.map(({ slug }) => ({ categorySlug: slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { categorySlug } = await params;
  const category = await getCatalogueCategory(categorySlug);
  if (!category) return { title: "Category Not Found" };

  return {
    title: `${category.title} | Laksh Capital Catalogue`,
    description:
      category.description ||
      `Explore ${category.title} investment products curated by Laksh Capital.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { categorySlug } = await params;
  const category = await getCatalogueCategory(categorySlug);

  if (!category) notFound();

  const accent = resolveCategoryAccentFromOrder(category.order);

  return (
    <CatalogueSection>
      <CategoryWorkspace category={category} accent={accent} />
    </CatalogueSection>
  );
}
