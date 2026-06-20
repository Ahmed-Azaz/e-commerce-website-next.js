import { getLocale, getMessages } from "@/lib/i18n.server";
import { Button, Paper, Stack, Typography } from "@mui/material";

export default async function NotFound() {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <Paper className="empty-panel" elevation={0}>
      <Stack spacing={2} alignItems="center">
        <Typography component="h1" variant="h2" sx={{ fontWeight: 900 }}>
          {messages.notFound.code}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          {messages.notFound.title}
        </Typography>
        <Button href="/" variant="contained">
          {messages.notFound.goHome}
        </Button>
      </Stack>
    </Paper>
  );
}
