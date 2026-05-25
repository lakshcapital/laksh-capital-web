import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import { getPostBySlug, getAllPostSlugs } from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/blog-card";
import PortableTextRenderer from "@/components/portable-text";

export const revalidate = 60;

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Post Not Found" };

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const ogImageSrc = post.ogImage || post.coverImage;

  return {
    title: `${title} | Laksh Capital Blog`,
    description,
    openGraph: {
      title,
      description,
      images: [urlFor(ogImageSrc).width(1200).height(630).fit("crop").url()],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const authorName = post.authorRef?.name || post.author;
  const authorSlug = post.authorRef?.slug.current;

  const categoryItems = post.categoryRefs?.length
    ? post.categoryRefs.map((c) => ({
        title: c.title,
        href: `/blog/category/${c.slug.current}`,
      }))
    : (post.categories || []).map((c) => ({ title: c, href: null }));

  return (
    <main className="py-16 md:py-24">
      <article className="container max-w-3xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        {categoryItems.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {categoryItems.map((cat) =>
              cat.href ? (
                <Link key={cat.title} href={cat.href}>
                  <Badge variant="secondary" className="hover:bg-secondary/70">
                    {cat.title}
                  </Badge>
                </Link>
              ) : (
                <Badge key={cat.title} variant="secondary">
                  {cat.title}
                </Badge>
              )
            )}
          </div>
        )}

        <h1 className="text-3xl font-semibold lg:text-5xl mb-4 leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8">
          {authorName && (
            <span className="flex items-center gap-1.5">
              <User className="size-4" />
              {authorSlug ? (
                <Link
                  href={`/blog/author/${authorSlug}`}
                  className="hover:text-foreground transition-colors"
                >
                  {authorName}
                </Link>
              ) : (
                authorName
              )}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <CalendarDays className="size-4" />
            {date}
          </span>
        </div>

        <div className="relative aspect-[16/9] overflow-hidden rounded-lg mb-10">
          <Image
            src={urlFor(post.coverImage).width(1200).height(675).fit("crop").url()}
            alt={post.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        <div className="prose-custom">
          <PortableTextRenderer value={post.body} />
        </div>

        {post.relatedPosts && post.relatedPosts.length > 0 && (
          <section className="mt-16 pt-10 border-t">
            <h2 className="text-2xl font-semibold mb-6">You might also like</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {post.relatedPosts.map((related) => (
                <BlogCard key={related._id} post={related} />
              ))}
            </div>
          </section>
        )}
      </article>
    </main>
  );
}
