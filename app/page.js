import FeaturedProductsCarousel from "@/components/FeaturedProductsCarousel";
import { getCategoryLabel, getLocale, getMessages } from "@/lib/i18n.server";
import { getProducts } from "@/lib/api";
import { Box, Button, Chip, Stack, Typography } from "@mui/material";

export default async function Home() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const products = (await getProducts()) || [];
  const featuredProducts = products.slice(0, 6).map((product) => ({
    ...product,
    localizedCategory: getCategoryLabel(product.category, messages),
  }));

  return (
    <Stack spacing={5}>
      <Box className="hero-panel">
        <Stack spacing={3} sx={{ maxWidth: 680 }}>
          <Chip label={messages.home.badge} sx={{ width: "fit-content" }} />
          <Typography component="h1" variant="h2" sx={{ fontWeight: 900 }}>
            {messages.home.title}
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {messages.home.description}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            <Button href="/products" size="large" variant="contained">
              {messages.home.shopProducts}
            </Button>
            <Button href="/products/create" size="large" variant="outlined">
              {messages.home.addProduct}
            </Button>
          </Stack>
        </Stack>
      </Box>

      <Stack spacing={2}>
        <Box>
          <Typography component="h2" variant="h4" sx={{ fontWeight: 900 }}>
            {messages.home.featuredTitle}
          </Typography>
          <Typography color="text.secondary">
            {messages.home.featuredDescription}
          </Typography>
        </Box>
        <FeaturedProductsCarousel
          labels={messages.products}
          products={featuredProducts}
        />
      </Stack>
    </Stack>
  );
}
