import { client } from "./client";
import {
  Author,
  Category,
  ContactSettings,
  FaqItem,
  Post,
  PostCard,
  TeamMember,
  Testimonial,
} from "./types";

const authorRefProjection = `
  authorRef->{
    _id,
    name,
    slug,
    role,
    photo
  }
`;

const categoryRefsProjection = `
  categoryRefs[]->{
    _id,
    title,
    slug
  }
`;

const postCardFields = `
  _id,
  title,
  slug,
  author,
  ${authorRefProjection},
  publishedAt,
  excerpt,
  coverImage,
  categories,
  ${categoryRefsProjection},
  isFeatured
`;

export async function getAllPosts(): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) { ${postCardFields} }`
  );
}

export async function getFeaturedPosts(count = 3): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && isFeatured == true] | order(publishedAt desc) [0...${count}] { ${postCardFields} }`
  );
}

export async function getLatestPosts(count = 3): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post"] | order(publishedAt desc) [0...${count}] { ${postCardFields} }`
  );
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      author,
      ${authorRefProjection},
      publishedAt,
      excerpt,
      coverImage,
      categories,
      ${categoryRefsProjection},
      isFeatured,
      seoTitle,
      seoDescription,
      ogImage,
      body,
      "relatedPosts": relatedPosts[]->{ ${postCardFields} }
    }`,
    { slug }
  );
}

export async function getAllPostSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(`*[_type == "post" && defined(slug.current)] { slug }`);
}

export async function getAllAuthors(): Promise<Author[]> {
  return client.fetch(
    `*[_type == "author"] | order(name asc) {
      _id, name, slug, role, photo, bio, linkedinUrl, twitterUrl
    }`
  );
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  return client.fetch(
    `*[_type == "author" && slug.current == $slug][0] {
      _id, name, slug, role, photo, bio, linkedinUrl, twitterUrl
    }`,
    { slug }
  );
}

export async function getPostsByAuthor(slug: string): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && authorRef->slug.current == $slug] | order(publishedAt desc) {
      ${postCardFields}
    }`,
    { slug }
  );
}

export async function getAllCategories(): Promise<Category[]> {
  return client.fetch(
    `*[_type == "category"] | order(title asc) {
      _id, title, slug, description
    }`
  );
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  return client.fetch(
    `*[_type == "category" && slug.current == $slug][0] {
      _id, title, slug, description
    }`,
    { slug }
  );
}

export async function getPostsByCategory(slug: string): Promise<PostCard[]> {
  return client.fetch(
    `*[_type == "post" && $slug in categoryRefs[]->slug.current] | order(publishedAt desc) {
      ${postCardFields}
    }`,
    { slug }
  );
}

export async function getAllAuthorSlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "author" && defined(slug.current)] { slug }`
  );
}

export async function getAllCategorySlugs(): Promise<{ slug: { current: string } }[]> {
  return client.fetch(
    `*[_type == "category" && defined(slug.current)] { slug }`
  );
}

export async function getAllTestimonials(): Promise<Testimonial[]> {
  return client.fetch(
    `*[_type == "testimonial"] | order(coalesce(order, 999) asc, _createdAt desc) {
      _id, name, designation, company, message, avatar, order
    }`
  );
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  return client.fetch(
    `*[_type == "teamMember"] | order(coalesce(order, 999) asc, _createdAt asc) {
      _id, name, role, avatar, order, linkedinUrl
    }`
  );
}

export async function getAllFaqItems(): Promise<FaqItem[]> {
  return client.fetch(
    `*[_type == "faqItem"] | order(coalesce(order, 999) asc, _createdAt asc) {
      _id, question, answer, order
    }`
  );
}

export async function getContactSettings(): Promise<ContactSettings | null> {
  return client.fetch(
    `*[_type == "contactSettings"] | order(_updatedAt desc) [0] {
      _id,
      interestOptions,
      portfolioOptions,
      goalOptions
    }`
  );
}
