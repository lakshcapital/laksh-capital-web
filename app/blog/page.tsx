import { Metadata } from "next";
import { getAllPosts, getFeaturedPosts } from "@/sanity/queries";
import BlogCard from "@/components/blog-card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog | Laksh Capital",
  description:
    "Insights on wealth management, investment strategies, tax planning, and financial markets from Laksh Capital.",
};

export const revalidate = 60;

export default async function BlogPage() {
  const [posts, featured] = await Promise.all([
    getAllPosts(),
    getFeaturedPosts(3),
  ]);

  const featuredIds = new Set(featured.map((p) => p._id));
  const restPosts = posts.filter((p) => !featuredIds.has(p._id));

  return (
    <main className="py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <Badge variant="outline" className="font-semibold">
            Blog
          </Badge>
          <h1 className="text-center text-3xl font-semibold lg:text-6xl">
            Insights & Articles
          </h1>
          <p className="text-muted-foreground lg:text-lg text-center max-w-2xl">
            Expert perspectives on wealth management, investment strategies, and
            financial planning to help you make informed decisions.
          </p>
        </div>

        {featured.length > 0 && (
          <section className="mb-16">
            <h2 className="mb-6 text-2xl font-semibold">Featured</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featured.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        )}

        {restPosts.length > 0 ? (
          <section>
            {featured.length > 0 && (
              <h2 className="mb-6 text-2xl font-semibold">All Posts</h2>
            )}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {restPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </section>
        ) : posts.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">
            No blog posts yet. Check back soon!
          </p>
        ) : null}
      </div>
    </main>
  );
}
