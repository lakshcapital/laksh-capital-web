import { MetadataRoute } from "next";
import { getAllPostSlugs } from "@/sanity/queries";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPostSlugs();

  const blogUrls = posts.map((post) => ({
    url: `https://www.lakshcapital.in/blog/${post.slug.current}`,
    lastModified: new Date(),
  }));

  const toolUrls = [
    "/tools",
    "/tools/sip-calculator",
    "/tools/lumpsum-calculator",
    "/tools/retirement-planner",
    "/tools/goal-sip-calculator",
  ].map((path) => ({
    url: `https://www.lakshcapital.in${path}`,
    lastModified: new Date(),
  }));

  return [
    { url: "https://www.lakshcapital.in", lastModified: new Date() },
    { url: "https://www.lakshcapital.in/blog", lastModified: new Date() },
    { url: "https://www.lakshcapital.in/services", lastModified: new Date() },
    ...blogUrls,
    ...toolUrls,
  ];
}
