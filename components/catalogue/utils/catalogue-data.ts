import type { CategoryWithFunds } from "@/lib/sanity";
import { accentKeyForIndex, getCategoryAccent } from "./accent";
import { transformSanityCategories } from "./transform-categories";

export function resolveCategoryAccentFromOrder(order = 1) {
  const index = Math.max(0, order - 1);
  return getCategoryAccent({
    accent: accentKeyForIndex(index),
    index,
  });
}

export function resolveCategoryAccent(
  data: CategoryWithFunds[],
  categorySlug: string
) {
  const category = data.find((item) => item.slug === categorySlug);
  if (category?.order) {
    return resolveCategoryAccentFromOrder(category.order);
  }

  const transformed = transformSanityCategories(data);
  const index = data.findIndex((item) => item.slug === categorySlug);
  const transformedCategory = transformed.find((item) => item.id === categorySlug);

  return getCategoryAccent({
    accent: transformedCategory?.accent,
    index: index === -1 ? 0 : index,
  });
}
