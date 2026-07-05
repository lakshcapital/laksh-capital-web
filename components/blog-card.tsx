import Image from "next/image";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { PostCard } from "@/sanity/types";
import { urlFor } from "@/sanity/image";
import { CalendarDays, User } from "lucide-react";

interface BlogCardProps {
  post: PostCard;
}

export default function BlogCard({ post }: BlogCardProps) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  const authorName = post.authorRef?.name || post.author;
  const categoryTitles = post.categoryRefs?.length
    ? post.categoryRefs.map((c) => c.title)
    : post.categories || [];

  return (
    <Link href={`/blog/${post.slug.current}`}>
      <Card className="group h-full overflow-hidden transition-shadow hover:shadow-lg">
        <CardHeader className="p-0">
          <div className="relative aspect-[16/9] overflow-hidden">
            <Image
              src={urlFor(post.coverImage).width(600).height(340).fit("crop").url()}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {post.isFeatured && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-primary text-primary-foreground">
                  Featured
                </Badge>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="p-5">
          {categoryTitles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {categoryTitles.map((cat) => (
                <Badge key={cat} variant="secondary" className="text-xs">
                  {cat}
                </Badge>
              ))}
            </div>
          )}
          <h3 className="mb-2 text-lg font-semibold leading-snug line-clamp-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="px-5 pb-5 pt-0 text-xs text-muted-foreground">
          <div className="flex items-center gap-4">
            {authorName && (
              <span className="flex items-center gap-1">
                <User className="size-3.5" />
                {authorName}
              </span>
            )}
            <span className="flex items-center gap-1">
              <CalendarDays className="size-3.5" />
              {date}
            </span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
