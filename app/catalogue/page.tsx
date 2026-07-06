import { CatalogueSection } from "@/components/catalogue/catalogue-section";
import { CategoryDirectory } from "@/components/catalogue/category-directory";
import { transformSanityCategories } from "@/components/catalogue/utils/transform-categories";
import { getCatalogueConfig } from "@/lib/sanity";

export const dynamic = "force-static";

export const metadata = {
  title: "Investment Catalogue | Laksh Capital",
  description:
    "Browse our curated selection of top-performing investment funds and international financial assets.",
};

export default async function CataloguePage() {
  const data = await getCatalogueConfig();

  return (
    <CatalogueSection>
      <CategoryDirectory categories={transformSanityCategories(data)} />
    </CatalogueSection>
  );
}
