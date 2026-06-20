const BASE = "http://localhost:3001/products";

export async function GET() {
  try {
    const res = await fetch(BASE);

    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch products" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const res = await fetch(BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      return Response.json(
        { error: "Failed to create product" },
        { status: res.status }
      );
    }

    const data = await res.json();

    return Response.json(data);
  } catch (error) {
    console.error("Error creating product:", error);
    return Response.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}