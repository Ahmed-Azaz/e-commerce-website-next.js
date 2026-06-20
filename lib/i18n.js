import { cookies } from "next/headers";
import ar from "@/messages/ar.json";
import en from "@/messages/en.json";

export const LOCALE_COOKIE = "locale";
export const defaultLocale = "en";
export const locales = ["en", "ar"];

const messages = { ar, en };

export function isValidLocale(locale) {
  return locales.includes(locale);
}

export async function getLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;

  return isValidLocale(locale) ? locale : defaultLocale;
}

export function getDirection(locale = defaultLocale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export async function getMessages(localeInput) {
  const locale = localeInput ?? (await getLocale());
  return messages[locale] ?? messages.en;
}

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
