import type { CategoryWithFunds } from "@/lib/sanity";
import type { Category } from "../types";
import { accentKeyForIndex } from "./accent";

export function transformSanityCategories(data: CategoryWithFunds[]): Category[] {
  return data.map((cat, index) => {
    return {
      id: cat.slug || cat._id,
      accent: accentKeyForIndex(index),
      code: cat.slug || cat._id,
      title: cat.title,
      description: cat.description || "Sophisticated wealth management solutions built to capture persistent pricing anomalies safely.",
      tags: cat.tags || [],
      fundImage: cat.fundImage || "",
      count: cat.funds?.length || 0,
    };
  });
}
