import { getLocale, getMessages } from "@/lib/i18n.server";
import ProductForm from "@/components/ProductForm";
import { getProduct } from "@/lib/api";

export default async function Page({ params }) {
  const { id } = await params;
  const locale = await getLocale();
  const messages = await getMessages(locale);
  const product = await getProduct(id);
  
  return (
    <ProductForm
      mode="edit"
      productId={id}
      defaultValues={{ 
        title: product.title, 
        price: product.price, 
        thumbnail: product.thumbnail,
        description: product.description || "",
        category: product.category || "",
        rating: product.rating || "",
        tags: Array.isArray(product.tags) ? product.tags : (product.tags ? [product.tags] : [])
      }}
      messages={messages.editProduct}
      redirectTo={`/products/${id}`}
      categories={messages.categories}
    />
  );
  
}
