import { getLocale, getMessages } from "@/lib/i18n.server";
import ProductForm from "@/components/ProductForm";

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <ProductForm
      mode="create"
      defaultValues={{ 
        title: "", 
        price: "", 
        thumbnail: "",
        description: "",
        category: "",
        rating: "",
        tags: []
      }}
      messages={messages.createProduct}
      redirectTo="/products"
      categories={messages.categories}
    />
  );
}
