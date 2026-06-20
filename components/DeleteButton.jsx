"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteButton({ id, label, errorLabel }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setError("");
    setIsDeleting(true);

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        setError(errorLabel);
        return;
      }

      router.refresh();
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <Button
        color="error"
        size="small"
        variant="outlined"
        disabled={isDeleting}
        onClick={handleDelete}
      >
        {label}
      </Button>
      {error ? <span className="visually-hidden">{error}</span> : null}
    </>
  );
}
