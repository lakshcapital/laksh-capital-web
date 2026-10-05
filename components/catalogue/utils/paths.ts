export const cataloguePaths = {
  home: () => "/catalogue",
  category: (categorySlug: string) => `/catalogue/${categorySlug}`,
  fund: (categorySlug: string, fundSlug: string) =>
    `/catalogue/${categorySlug}/${fundSlug}`,
} as const;
