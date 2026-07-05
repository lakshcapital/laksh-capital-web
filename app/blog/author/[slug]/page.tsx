import { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Linkedin, Twitter } from "lucide-react";
import {
  getAllAuthorSlugs,
  getAuthorBySlug,
  getPostsByAuthor,
} from "@/sanity/queries";
import { urlFor } from "@/sanity/image";
import BlogCard from "@/components/blog-card";

export const revalidate = 60;

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((s) => ({ slug: s.slug.current }));
}

export async function generateMetadata({
  params,
}: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return { title: "Author Not Found" };
  return {
    title: `${author.name} | Laksh Capital Blog`,
    description: author.bio || `Posts by ${author.name}`,
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();
  const posts = await getPostsByAuthor(slug);

  return (
    <main className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Blog
        </Link>

        <header className="mb-12 flex flex-col items-center gap-4 text-center md:flex-row md:items-start md:text-left">
          {author.photo && (
            <div className="relative size-32 overflow-hidden rounded-full shrink-0">
              <Image
                src={urlFor(author.photo).width(256).height(256).fit("crop").url()}
                alt={author.name}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div>
            <h1 className="text-3xl font-semibold lg:text-5xl mb-2">
              {author.name}
            </h1>
            {author.role && (
              <p className="text-muted-foreground mb-3">{author.role}</p>
            )}
            {author.bio && (
              <p className="text-foreground/80 max-w-2xl">{author.bio}</p>
            )}
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              {author.linkedinUrl && (
                <a
                  href={author.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Linkedin className="size-5" />
                </a>
              )}
              {author.twitterUrl && (
                <a
                  href={author.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Twitter className="size-5" />
                </a>
              )}
            </div>
          </div>
        </header>

        <h2 className="text-2xl font-semibold mb-6">
          Posts by {author.name}
        </h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No posts yet.</p>
        )}
      </div>
    </main>
  );
}
