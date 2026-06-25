"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { CategoryWithFunds } from "@/lib/sanity";
import { cn } from "@/lib/utils";
import { CategoryDirectory } from "./category-directory";
import { CategoryWorkspace } from "./category-workspace";
import { getCategoryAccent } from "./utils/accent";
import { transformSanityCategories } from "./utils/transform-categories";

interface CatalogueRootProps {
  data: CategoryWithFunds[];
  className?: string;
}

export default function CatalogueRoot({ data, className }: CatalogueRootProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [liveMetrics, setLiveMetrics] = useState<Record<string, { nav: string; date: string }>>({});

  const handleBackToDirectory = useCallback(() => {
    setActiveCategory(null);
  }, []);
  // This is used to fetch the live metrics for the funds can update this later
  // const allSchemeCodes = useMemo(() => {
  //   const codes = new Set<string>();
  //   data.forEach((cat) => {
  //     cat.funds?.forEach((fund) => {
  //       if (fund.schemeCode) codes.add(fund.schemeCode);
  //     });
  //   });
  //   return Array.from(codes);
  // }, [data]);

  // useEffect(() => {
  //   if (allSchemeCodes.length === 0) return;
    
  //   async function hydrateLivePrices() {
  //     try {
  //       const queryParam = allSchemeCodes.join(",");
  //       const response = await fetch(`/api/funds?codes=${queryParam}`);
  //       if (response.ok) {
  //         const dataLookup = await response.json();
  //         setLiveMetrics(dataLookup);
  //       }
  //     } catch (err) {
  //       console.error("Failed fetching background runtime metrics: ", err);
  //     }
  //   }
    
  //   hydrateLivePrices();
  // }, [allSchemeCodes]);

  const transformedCategories = useMemo(() => transformSanityCategories(data), [data]);

  // Map local live values directly on top of server data objects cleanly
  const normalizedData = useMemo(() => {
    return data.map((category) => ({
      ...category,
      funds: (category.funds || []).map((fund) => {
        const liveMetric = fund.schemeCode ? liveMetrics[fund.schemeCode] : null;
        return {
          ...fund,
          liveNav: liveMetric?.nav || fund.liveNav || "N/A",
          liveNavDate: liveMetric?.date || fund.liveNavDate || "N/A",
        };
      }),
    }));
  }, [data, liveMetrics]);

  const activeCategoryObject = useMemo(() => {
    return normalizedData.find((cat) => cat.slug === activeCategory);
  }, [activeCategory, normalizedData]);

  const activeCategoryIndex = useMemo(() => {
    return normalizedData.findIndex((cat) => cat.slug === activeCategory);
  }, [activeCategory, normalizedData]);

  const activeAccent = useMemo(() => {
    const transformed = transformedCategories.find((cat) => cat.id === activeCategory);
    return getCategoryAccent({
      accent: transformed?.accent,
      index: activeCategoryIndex === -1 ? 0 : activeCategoryIndex,
    });
  }, [activeCategory, activeCategoryIndex, transformedCategories]);

  return (
    <section id="catalogue" className={cn("relative pb-12 overflow-hidden", className)}>
      <div className="container px-4 sm:px-6">
        <AnimatePresence mode="wait">
          {!activeCategory ? (
            <motion.div
              key="directory"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <CategoryDirectory
                categories={transformedCategories}
                onSelect={setActiveCategory}
              />
            </motion.div>
          ) : (
            activeCategoryObject && (
              <motion.div
                key="workspace"
                initial={{ opacity: 0, scale: 0.99, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.99, y: -10 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <CategoryWorkspace
                  category={activeCategoryObject}
                  accent={activeAccent}
                  onBack={handleBackToDirectory}
                />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}