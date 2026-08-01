import { SchemaTypeDefinition } from "sanity";
import post from "./post";
import author from "./author";
import category from "./category";
import testimonial from "./testimonial";
import teamMember from "./teamMember";
import faqItem from "./faqItem";
import { fundType } from "./fund";
import { fundHeroMetricsType } from "./fundHeroMetrics";
import { fundKeyFactsType } from "./fundKeyFacts";
import { fundReturnPeriodType } from "./fundReturnPeriod";
import { fundPerformanceType } from "./fundPerformance";
import { fundManagerType } from "./fundManager";

export const schemaTypes: SchemaTypeDefinition[] = [
  post,
  author,
  category,
  testimonial,
  teamMember,
  faqItem,
  fundType,
  fundHeroMetricsType,
  fundKeyFactsType,
  fundReturnPeriodType,
  fundPerformanceType,
  fundManagerType,
];
