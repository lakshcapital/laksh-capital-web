import { SchemaTypeDefinition } from "sanity";
import post from "./post";
import author from "./author";
import category from "./category";
import testimonial from "./testimonial";
import teamMember from "./teamMember";
import faqItem from "./faqItem";
import contactSettings from "./contactSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  testimonial,
  teamMember,
  faqItem,
  contactSettings,
];
