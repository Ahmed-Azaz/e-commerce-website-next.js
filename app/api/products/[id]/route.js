const BASE = "http://localhost:3001/products";

export async function GET(_req, { params }) {
  const { id } = await params;

  const res = await fetch(`${BASE}/${id}`);

  if (!res.ok) {
    return Response.json({ error: "Failed to fetch product" }, { status: 500 });
  }

  const product = await res.json();

  return Response.json(product);
}

export async function PUT(req, { params }) {
  const { id } = await params;
  const body = await req.json();

  const res = await fetch(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to update product" }, { status: 500 });
  }

  const product = await res.json();

  return Response.json(product);
}

export async function DELETE(_req, { params }) {
  const { id } = await params;

  const res = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    return Response.json({ error: "Failed to delete product" }, { status: 500 });
  }

  const product = await res.json();

  return Response.json(product);
}