"use client";

import { Badge, Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import {
  getCartItems,
  getFavoriteItems,
  subscribeToStore,
} from "@/lib/client-store";

export default function NavBadges({ messages }) {
  const [counts, setCounts] = useState({ cart: 0, favorites: 0 });

  useEffect(() => {
    function sync() {
      setCounts({
        cart: getCartItems().length,
        favorites: getFavoriteItems().length,
      });
    }

    sync();
    return subscribeToStore(sync);
  }, []);

  return (
    <Stack direction="row" flexWrap="wrap" gap={1} alignItems="center">
      <Button href="/products" color="inherit">
        {messages.products}
      </Button>
      <Button href="/products/create" color="inherit">
        {messages.create}
      </Button>
      <Badge badgeContent={counts.cart} color="primary">
        <Button href="/cart" color="inherit">
          {messages.cart}
        </Button>
      </Badge>
      <Badge badgeContent={counts.favorites} color="secondary">
        <Button href="/favorites" color="inherit">
          {messages.favorites}
        </Button>
      </Badge>
    </Stack>
  );
}
