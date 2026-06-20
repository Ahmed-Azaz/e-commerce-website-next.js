import { Box, Container, Divider, Stack, Typography } from "@mui/material";

export default function Footer({ messages }) {
  const year = new Date().getFullYear();

  return (
    <Box component="footer" className="site-footer">
      <Container maxWidth="lg">
        <Stack spacing={4}>
          <Box
            sx={{
              display: "grid",
              gap: 3,
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, minmax(0, 1fr))",
                lg: "1.2fr 1fr 1fr 1fr",
              },
            }}
          >
            <Stack spacing={1.5}>
              <Typography variant="h5" sx={{ fontWeight: 900 }}>
                {messages.brand}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.description}
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 800 }}>
                {messages.footer.aboutTitle}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.aboutText}
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 800 }}>
                {messages.footer.contactTitle}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.email}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.phone}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.hours}
              </Typography>
            </Stack>

            <Stack spacing={1}>
              <Typography sx={{ fontWeight: 800 }}>
                {messages.footer.helpTitle}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.shipping}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.returns}
              </Typography>
              <Typography color="text.secondary">
                {messages.footer.support}
              </Typography>
            </Stack>
          </Box>

          <Divider />

          <Typography color="text.secondary" >
            {year} {messages.footer.trademark}
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
