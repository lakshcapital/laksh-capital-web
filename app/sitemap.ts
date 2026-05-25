import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();

  const blogUrls = posts.map((post) => ({
    url: `https://www.lakshcapital.in/blog/${post.slug.current}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://www.lakshcapital.in", lastModified: new Date() },
    { url: "https://www.lakshcapital.in/blog", lastModified: new Date() },
    ...blogUrls,
  ];
}
