"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Box,
  Button,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { getCategoryLabel, getMessages } from "@/lib/i18n.client";

export default function Page() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [messages, setMessages] = useState(null);

  // load product
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/products/${id}`);
        
        if (!res.ok) {
          setProduct(null);
          return;
        }
        
        const data = await res.json();
        
        if (data.error) {
          setProduct(null);
          return;
        }
        
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      }
    }

    if (id) fetchProduct();
  }, [id]);

  // load i18n (client-safe approach)
  useEffect(() => {
    setMessages(getMessages("en"));
  }, []);

  if (!product || !messages) return <p>Loading...</p>;

  return (
    <Paper elevation={0} sx={{ border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "0.95fr 1.05fr" },
          gap: 4,
          p: { xs: 3, md: 5 },
        }}
      >
        <Box
          sx={{
            display: "grid",
            placeItems: "center",
            minHeight: 360,
            borderRadius: 2,
            bgcolor: "#f5f7fb",
          }}
        >
          <Image
            src={product.thumbnail}
            width={420}
            height={420}
            alt={product.title}
            style={{ height: "auto", maxWidth: "100%", objectFit: "contain" }}
          />
        </Box>

        <Stack spacing={3}>
          <Stack spacing={1.5}>
            <Chip
              label={getCategoryLabel(product.category, messages)}
              sx={{ alignSelf: "flex-start", textTransform: "capitalize" }}
            />
            <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>
              {product.title}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {product.description}
            </Typography>
          </Stack>

          <Divider />

          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h3" color="primary" sx={{ fontWeight: 900 }}>
              ${product.price}
            </Typography>

            {product.rating ? (
              <Chip label={`${product.rating} rating`} variant="outlined" />
            ) : null}
          </Stack>

          <Stack direction="row" flexWrap="wrap" gap={1.5}>
            <Button href={`/products/${product.id}/edit`} variant="contained">
              Edit
            </Button>
            <Button href="/products" variant="outlined">
              Back
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Paper>
  );
}