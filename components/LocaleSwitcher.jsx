"use client";

import { setLocale } from "@/lib/actions";
import { Box, Button, Stack } from "@mui/material";
import { usePathname } from "next/navigation";

export default function LocaleSwitcher({ locale, labels }) {
  const pathname = usePathname();

  return (
    <Stack direction="row" gap={1}>
      {["en", "ar"].map((nextLocale) => (
        <Box key={nextLocale} component="form" action={setLocale}>
          <input type="hidden" name="locale" value={nextLocale} />
          <input type="hidden" name="pathname" value={pathname} />
          <Button
            size="small"
            type="submit"
            variant={locale === nextLocale ? "contained" : "text"}
          >
            {labels[nextLocale]}
          </Button>
        </Box>
      ))}
    </Stack>
  );
}
