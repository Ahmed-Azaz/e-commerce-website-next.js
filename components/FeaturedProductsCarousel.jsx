"use client";

import ProductCard from "./ProductCard";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useEffect, useState } from "react";
const GAP = 24;
function getVisibleCount(width, total) {
  if (width < 700) {
    return Math.min(1, total);
  }

  if (width < 1080) {
    return Math.min(2, total);
  }

  return Math.min(3, total);
}

export default function FeaturedProductsCarousel({ products, labels }) {
  const [visibleCount, setVisibleCount] = useState(Math.min(3, products.length));
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    function updateVisibleCount() {
      setVisibleCount(getVisibleCount(window.innerWidth, products.length));
    }

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);

    return () => {
      window.removeEventListener("resize", updateVisibleCount);
    };
  }, [products.length]);

  if (!products.length) {
    return null;
  }

  const visibleProducts = Array.from({ length: visibleCount }, (_, offset) => {
    return products[(startIndex + offset) % products.length];
  });

  function handlePrevious() {
    setStartIndex((prev) => (prev - 1 + products.length) % products.length);
  }

  function handleNext() {
    setStartIndex((prev) => (prev + 1) % products.length);
  }

  const buttonStyles = {
    position: "absolute",
    top: "50%",
    zIndex: 3,
    transform: "translateY(-50%)",
    border: "1px solid rgba(15, 23, 42, 0.12)",
    background: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 10px 30px rgba(15, 23, 42, 0.12)",
    "&:hover": {
      background: "#ffffff",
    },
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <IconButton
        aria-label={labels.previous}
        onClick={handlePrevious}
        sx={{
          ...buttonStyles,
          left: { xs: 8, sm: 12 },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        aria-label={labels.next}
        onClick={handleNext}
        sx={{
          ...buttonStyles,
          right: { xs: 8, sm: 12 },
        }}
      >
        <ChevronRight />
      </IconButton>

      <Box
        sx={{
          display: "grid",
          gap: `${GAP}px`,
          gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
          px: { xs: 6, sm: 7 },
        }}
      >
        {visibleProducts.map((product, index) => (
          <Box
            key={`${product.id}-${startIndex}-${index}`}
            sx={{
              minWidth: 0,
            }}
          >
            <ProductCard product={product} labels={labels} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
