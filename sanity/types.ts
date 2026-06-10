import { PortableTextBlock } from "@portabletext/react";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface AuthorRef {
  _id: string;
  name: string;
  slug: { current: string };
  role?: string;
  photo?: SanityImageSource;
}

export interface Author extends AuthorRef {
  bio?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
}

export interface CategoryRef {
  _id: string;
  title: string;
  slug: { current: string };
}

export interface Category extends CategoryRef {
  description?: string;
}

export interface Post {
  _id: string;
  title: string;
  slug: { current: string };
  author?: string;
  authorRef?: AuthorRef;
  publishedAt: string;
  excerpt: string;
  coverImage: SanityImageSource;
  categories?: string[];
  categoryRefs?: CategoryRef[];
  isFeatured?: boolean;
  relatedPosts?: PostCard[];
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: SanityImageSource;
}

export type PostCard = Omit<Post, "body" | "relatedPosts" | "seoTitle" | "seoDescription" | "ogImage">;

export interface Testimonial {
  _id: string;
  name: string;
  designation: string;
  company: string;
  message: string;
  avatar?: SanityImageSource;
  order?: number;
}

export interface TeamMember {
  _id: string;
  name: string;
  role: string;
  avatar: SanityImageSource;
  order?: number;
  linkedinUrl?: string;
}

export interface FaqItem {
  _id: string;
  question: string;
  answer: PortableTextBlock[];
  order?: number;
}

export interface Service {
  _id: string;
  title: string;
  description: string;
  image: SanityImageSource;
  order?: number;
  enlarge?: boolean;
}

export interface ContactSettings {
  _id: string;
  interestOptions?: string[];
  portfolioOptions?: string[];
  goalOptions?: string[];
}
