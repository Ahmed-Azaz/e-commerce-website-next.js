import Image from "next/image";
import Link from "next/link";
import { Box, Container, Stack, Typography } from "@mui/material";
import NavBadges from "./NavBadges";
import LocaleSwitcher from "./LocaleSwitcher";
const BrandIcon="/favicon.ico";
export default function Navbar({ locale, messages }) {
  return (
    <Box
      component="header"
      className="navbar"
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          alignItems={{ xs: "flex-start", sm: "center" }}
          justifyContent="space-between"
          spacing={2}
        >
          <Link href="/" className="brand-link">
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
              <Image src={BrandIcon} alt="" width={28} height={28} />
              <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: 0 }}>
                {messages.brand}
              </Typography>
            </Box>
          </Link>

          <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
            <NavBadges messages={messages.navbar} />
            <LocaleSwitcher locale={locale} labels={messages.languageSwitcher} />
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
