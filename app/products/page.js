import { getLocale, getMessages } from "@/lib/i18n.server";
import ProductList from "@/components/ProductList";
import { getProducts } from "@/lib/api";
import { Box, Button, Stack, Typography } from "@mui/material";

export const revalidate = 60;

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const products = await getProducts();

  return (
    <Stack spacing={4}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "flex-end" }}
        spacing={2}
      >
        <Box>
          <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>
            {messages.products.title}
          </Typography>
          <Typography color="text.secondary">
            {messages.products.description}
          </Typography>
        </Box>
        <Button href="/products/create" variant="contained">
          {messages.products.createProduct}
        </Button>
      </Stack>
      <ProductList products={products} messages={messages} />
    </Stack>
  );
}
