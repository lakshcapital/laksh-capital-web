import Link from "next/link";

export default function CatalogueNotFound() {
  return (
    <div className="container py-16 text-center">
      <h1 className="text-3xl font-semibold mb-4">Not Found</h1>
      <p className="text-muted-foreground mb-8">
        This catalogue page does not exist or is no longer available.
      </p>
      <Link
        href="/catalogue"
        className="inline-flex items-center gap-2 text-primary hover:underline"
      >
        Back to Catalogue
      </Link>
    </div>
  );
}
