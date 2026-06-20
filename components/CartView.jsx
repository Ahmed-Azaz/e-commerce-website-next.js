"use client";

import {
  Box,
  Button,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCartItems,
  removeCartItem,
  subscribeToStore,
} from "@/lib/client-store";
import { Label } from "@mui/icons-material";

export default function CartView({ messages }) {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    function sync() {
      setCart(getCartItems());
    }

    sync();
    return subscribeToStore(sync);
  }, []);

  return (
    <Stack spacing={3}>
      <Box>
        <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>
          {messages.title}
        </Typography>
        <Typography color="text.secondary">
          {messages.description}
        </Typography>
      </Box>

      <Paper
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
        }}
      >
        {cart.length ? (
          <Stack divider={<Divider />}>
            {cart.map((item) => (
              <Stack
                key={item.id}
                direction="row"
                spacing={2}
                alignItems="center"
                justifyContent="space-between"
                sx={{ py: 2 }}
              >
                {/* LEFT: Image + Info */}
                <Stack direction="row" spacing={2} alignItems="center">
                  <Box
                    component="img"
                    src={item.thumbnail}
                    alt={item.title}
                    sx={{
                      width: 80,
                      height: 80,
                      objectFit: "contain",
                      bgcolor: "#f5f7fb",
                      borderRadius: 1,
                      p: 1,
                    }}
                  />

                  <Box>
                    <Typography sx={{ fontWeight: 800 }}>
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary">
                      {item.localizedCategory}
                    </Typography>
                  </Box>
                </Stack>

                {/* RIGHT: Actions */}
                <Stack
                  direction="row"
                  alignItems="center"
                  gap={2}
                  flexWrap="wrap"
                >
                  <Typography color="primary" sx={{ fontWeight: 900 }}>
                    ${item.price}
                  </Typography>

                  <Button
                    href={`/products/${item.id}`}
                    size="small"
                    variant="contained"
                  >
                    {messages.view}
                  </Button>

                  <Button
                    color="inherit"
                    variant="outlined"
                    onClick={() => removeCartItem(item.id)}
                  >
                    {messages.remove}
                  </Button>
                </Stack>
              </Stack>
            ))}
          </Stack>
        ) : (
          <Stack spacing={2} alignItems="flex-start">
            <Typography variant="h5" sx={{ fontWeight: 800 }}>
              {messages.emptyTitle}
            </Typography>
            <Typography color="text.secondary">
              {messages.emptyDescription}
            </Typography>
            <Button href="/products" variant="contained">
              {messages.browse}
            </Button>
          </Stack>
        )}
      </Paper>
    </Stack>
  );
}
