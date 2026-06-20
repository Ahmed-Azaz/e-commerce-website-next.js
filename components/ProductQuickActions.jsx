"use client";

import { Box, IconButton, Tooltip } from "@mui/material";
import {
  ShoppingCart as ShoppingCartIcon,
  Favorite as FavoriteIcon,
  FavoriteBorder as FavoriteBorderIcon,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import {
  getCartItems,
  getFavoriteItems,
  subscribeToStore,
  toggleCartItem,
  toggleFavoriteItem,
} from "@/lib/client-store";

export default function ProductQuickActions({ product, labels }) {
  const [state, setState] = useState({
    inCart: false,
    inFavorites: false,
  });

  useEffect(() => {
    function sync() {
      const next = {
        inCart: getCartItems().some((item) => item.id === product.id),
        inFavorites: getFavoriteItems().some(
          (item) => item.id === product.id
        ),
      };

      setState((prev) => {
        if (
          prev.inCart === next.inCart &&
          prev.inFavorites === next.inFavorites
        ) {
          return prev;
        }
        return next;
      });
    }

    sync();
    return subscribeToStore(sync);
  }, [product.id]);

  const normalizedProduct = {
    id: product.id,
    title: product.title,
    price: product.price,
    thumbnail: product.thumbnail,
    localizedCategory: product.localizedCategory,
  };

  const handleToggleCart = () => {
    toggleCartItem(normalizedProduct);
  };

  const handleToggleFavorites = () => {
    toggleFavoriteItem(normalizedProduct);
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 12,
        right: 12,
        display: "flex",
        gap: 1,
        zIndex: 1,
      }}
    >
      <Tooltip title={state.inCart ? labels.removeFromCart : labels.addToCart}>
        <IconButton
          aria-label={
            state.inCart ? labels.removeFromCart : labels.addToCart
          }
          onClick={handleToggleCart}
          sx={{
            bgcolor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            color: state.inCart ? "primary.main" : "text.primary",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <ShoppingCartIcon />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={
          state.inFavorites
            ? labels.removeFromFavorites
            : labels.addToFavorites
        }
      >
        <IconButton
          aria-label={
            state.inFavorites
              ? labels.removeFromFavorites
              : labels.addToFavorites
          }
          onClick={handleToggleFavorites}
          sx={{
            bgcolor: "rgba(255,255,255,0.92)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            color: state.inFavorites ? "error.main" : "text.primary",
            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          {state.inFavorites ? <FavoriteIcon /> : <FavoriteBorderIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}