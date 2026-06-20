import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

export const defaultLocale = "en";

export function getCategoryLabel(category, dictionary) {
  if (!category) {
    return dictionary.products.product;
  }

  return (
    dictionary.categories?.[category] ??
    category
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")
  );
}

export function getMessages(locale = "en") {
  const messages = { ar, en };
  return messages[locale] ?? messages.en;
}
