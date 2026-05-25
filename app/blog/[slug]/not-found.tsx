import Link from "next/link";

export default function NotFound() {
  return (
    <main className="py-16 md:py-24 lg:py-28">
      <div className="container text-center">
        <h1 className="text-3xl font-semibold mb-4">Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-primary hover:underline"
        >
          Back to Blog
        </Link>
      </div>
    </main>
  );
}
