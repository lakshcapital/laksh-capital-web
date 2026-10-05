import type { AccentKey, CategoryAccent } from "../utils/accent";

export type { AccentKey, CategoryAccent };

export interface Category {
  id: string;
  code: string;
  title: string;
  description: string;
  tags: string[];
  fundImage: string;
  accent?: AccentKey;
  count: number;
}
