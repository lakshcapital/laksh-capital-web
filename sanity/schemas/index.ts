import { SchemaTypeDefinition } from "sanity";
import post from "./post";
import author from "./author";
import category from "./category";
import testimonial from "./testimonial";
import teamMember from "./teamMember";
import faqItem from "./faqItem";
import contactSettings from "./contactSettings";
import service from "./service";
import heroSettings from "./heroSettings";
import aboutSettings from "./aboutSettings";

export const schemaTypes: SchemaTypeDefinition[] = [
  heroSettings,
  aboutSettings,
  post,
  author,
  category,
  service,
  testimonial,
  teamMember,
  faqItem,
  contactSettings,
];
