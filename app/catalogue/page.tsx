
import Header from "@/components/header";
import Footer from "@/components/footer";
import Catalogue from "@/components/catalogue";
import { getCatalogueConfig } from "@/lib/sanity";
import ScrollToTop from "@/components/scroll-to-top";

export const dynamic = "force-static"; 

export const metadata = {
  title: "Investment Catalogue | Laksh Capital",
  description: "Browse our curated selection of top-performing investment funds and international financial assets.",
};

export default async function CataloguePage() {
  const compiledCatalogue = await getCatalogueConfig();

  return (
    <>
      <ScrollToTop />
      <div className="hero__bg h-full w-full absolute inset-0 -z-10 bg-[radial-gradient(circle_at_85%_33%,rgba(0,255,235,0.075)_0%,hsla(0,0%,100%,0)_25%),radial-gradient(circle_at_12%_35%,rgba(108,99,255,0.15)_0%,hsla(0,0%,100%,0)_25%)]" />
      <Header />
      <main className="min-h-screen pt-12">
        <Catalogue data={compiledCatalogue} />
      </main>
      <Footer />
    </>
  );
}