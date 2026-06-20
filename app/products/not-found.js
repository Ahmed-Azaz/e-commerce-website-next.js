import { getLocale, getMessages } from "@/lib/i18n.server";
import { Button, Paper, Stack, Typography } from "@mui/material";

export default async function NotFound() {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <Paper className="empty-panel" elevation={0}>
      <Stack spacing={2} alignItems="center">
        <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>
          {messages.products.productNotFound}
        </Typography>
        <Typography color="text.secondary">
          {messages.products.productNotFoundDescription}
        </Typography>
        <Button href="/products" variant="contained">
          {messages.products.backToProducts}
        </Button>
      </Stack>
    </Paper>
  );
}
