"use client";

import { Alert, Autocomplete, Box, Button, MenuItem, Paper, Select, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ProductForm({
  mode,
  productId,
  defaultValues,
  messages,
  redirectTo,
  categories = {},
}) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedTags, setSelectedTags] = useState(
    Array.isArray(defaultValues.tags) ? defaultValues.tags : 
    (typeof defaultValues.tags === "string" && defaultValues.tags ? defaultValues.tags.split(",").map(t => t.trim()) : [])
  );

  const categoryList = Object.entries(categories).map(([key, value]) => ({ key, value }));
  const commonTags = ["beauty", "mascara", "eyeshadow", "face powder", "lipstick", "nail polish", "fragrances", "perfumes", "furniture", "beds", "sofas", "chairs", "groceries", "fruits", "meat", "vegetables", "electronics", "smartphones", "laptops", "gaming", "fitness", "kitchen", "accessories", "clothing", "shoes", "watches", "jewelry"];

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const payload = {
      title: formData.get("title"),
      price: parseFloat(formData.get("price")),
      thumbnail: formData.get("thumbnail"),
      description: formData.get("description"),
      category: formData.get("category"),
      rating: formData.get("rating") ? parseFloat(formData.get("rating")) : null,
      tags: selectedTags,
    };

    const endpoint =
      mode === "create" ? "/api/products" : `/api/products/${productId}`;
    const method = mode === "create" ? "POST" : "PUT";

    setIsSubmitting(true);

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        setError(messages.error);
        return;
      }

      router.push(redirectTo);
      router.refresh();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Box className="form-shell">
      <Paper
        component="form"
        onSubmit={handleSubmit}
        elevation={0}
        sx={{
          border: "1px solid",
          borderColor: "divider",
          borderRadius: 2,
          p: { xs: 3, sm: 4 },
        }}
      >
        <Stack spacing={3}>
          <Box>
            <Typography component="h1" variant="h3" sx={{ fontWeight: 900 }}>
              {messages.title}
            </Typography>
            <Typography color="text.secondary">
              {messages.description}
            </Typography>
          </Box>

          {error ? <Alert severity="error">{error}</Alert> : null}

          <TextField
            name="title"
            label={messages.titleField}
            defaultValue={defaultValues.title}
            required
            fullWidth
          />
          <TextField
            name="price"
            label={messages.priceField}
            defaultValue={defaultValues.price}
            type="number"
            required
            fullWidth
            inputProps={{ min: 0, step: 0.01 }}
          />
          <TextField
            name="thumbnail"
            label={messages.thumbnailField}
            defaultValue={defaultValues.thumbnail}
            fullWidth
            multiline
            rows={2}
            placeholder="https://example.com/image.jpg"
          />
          <TextField
            name="description"
            label={messages.descriptionField}
            defaultValue={defaultValues.description}
            fullWidth
            multiline
            rows={3}
            placeholder="Enter product description"
          />
          
          <Select
            name="category"
            defaultValue={defaultValues.category || ""}
            fullWidth
            required
            displayEmpty
          >
            <MenuItem value="" disabled>
              {messages.categoryField}
            </MenuItem>
            {categoryList.map(({ key, value }) => (
              <MenuItem key={key} value={key}>
                {value}
              </MenuItem>
            ))}
          </Select>

          <TextField
            name="rating"
            label={messages.ratingField}
            defaultValue={defaultValues.rating}
            type="number"
            fullWidth
            inputProps={{ min: 0, max: 5, step: 0.01 }}
            placeholder="0-5"
          />

          <Autocomplete
            multiple
            options={commonTags}
            value={selectedTags}
            onChange={(event, newValue) => setSelectedTags(newValue)}
            freeSolo
            renderInput={(params) => (
              <TextField {...params} label={messages.tagsField} placeholder="Select or type tags" />
            )}
          />

          <Stack direction="row" gap={1.5}>
            <Button type="submit" size="large" variant="contained" disabled={isSubmitting}>
              {isSubmitting ? messages.submitting : messages.submit}
            </Button>
            <Button href={redirectTo} size="large" variant="outlined" disabled={isSubmitting}>
              {messages.cancel}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Box>
  );
}
