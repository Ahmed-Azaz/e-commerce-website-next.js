import { notFound } from "next/navigation";

const BASE = "http://localhost:3000/api/products";

export async function getProducts() {
  try {
    const res = await fetch(BASE, {
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Failed to fetch products");

    const data = await res.json();

    return Array.isArray(data) ? data : data.products || [];
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

export async function getProduct(id) {
  if (!id) notFound();

  try {
    const res = await fetch(`${BASE}/${id}`, {
      cache: "no-store",
    });

    if (res.status === 404) notFound();

    if (!res.ok) throw new Error("Failed to fetch product");

    const data = await res.json();

    if (!data || data.error) notFound();

    return data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    notFound();
  }
}