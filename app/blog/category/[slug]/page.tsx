import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import {
  getAllCategorySlugs,
  getCategoryBySlug,
  getPostsByCategory,
} from "@/sanity/queries";
import BlogCard from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";

export const revalidate = 60;

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllCategorySlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Category Not Found" };
  return {
    title: `${category.title} | Laksh Capital Blog`,
    description: category.description || `Posts in ${category.title}`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) notFound();
  const posts = await getPostsByCategory(slug);

  return (
    <main className="py-16 md:py-24">
      <div className="container">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <header className="mb-12 flex flex-col items-center gap-4 text-center">
          <Badge variant="outline" className="font-semibold">
            Category
          </Badge>
          <h1 className="text-3xl font-semibold lg:text-5xl">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-muted-foreground max-w-2xl">
              {category.description}
            </p>
          )}
        </header>

        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-12">
            No posts in this category yet.
          </p>
        )}
      </div>
    </main>
  );
}
