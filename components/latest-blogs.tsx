import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "./ui/badge";
import BlogCard from "./blog-card";
import { getLatestPosts } from "@/sanity/queries";

export default async function LatestBlogs() {
  const posts = await getLatestPosts(3);

  if (posts.length === 0) return null;

  return (
    <section id="blog" className="py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="flex flex-col items-center gap-6 mb-12">
          <Badge variant="outline" className="font-semibold">
            Blog
          </Badge>
          <h2 className="text-center text-3xl font-semibold lg:text-6xl">
            Latest Insights
          </h2>
          <p className="text-muted-foreground lg:text-lg text-center max-w-2xl">
            Stay informed with our latest articles on investment strategies,
            market trends, and financial planning.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-primary font-medium hover:underline underline-offset-4"
          >
            View All Posts
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
