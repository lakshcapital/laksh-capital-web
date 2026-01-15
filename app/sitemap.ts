import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://www.lakshcapital.in", lastModified: new Date() }];
}
