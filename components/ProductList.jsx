import ProductCard from "./ProductCard";
import { Box } from "@mui/material";
import { getCategoryLabel } from "@/lib/i18n.utils";

export default function ProductList({ products, messages }) {
  const localizedProducts = products.map((product) => ({
    ...product,
    localizedCategory: getCategoryLabel(product.category, messages),
  }));

  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
      }}
    >
      {localizedProducts.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          labels={messages.products}
        />
      ))}
    </Box>
  );
}
