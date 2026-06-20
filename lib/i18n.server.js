import { cookies } from "next/headers";
import { getCategoryLabel, getMessages as getMessagesUtil } from "@/lib/i18n.utils";

export const LOCALE_COOKIE = "locale";
export const defaultLocale = "en";
export const locales = ["en", "ar"];

export function isValidLocale(locale) {
  return locales.includes(locale);
}

export async function getLocale() {
  const cookieStore = await cookies();
  const locale = cookieStore.get(LOCALE_COOKIE)?.value;

  return isValidLocale(locale) ? locale : defaultLocale;
}

export function getMessages(locale) {
  return getMessagesUtil(locale);
}

export function getDirection(locale = defaultLocale) {
  return locale === "ar" ? "rtl" : "ltr";
}

export { getCategoryLabel };
