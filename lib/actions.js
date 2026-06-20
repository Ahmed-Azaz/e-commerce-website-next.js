"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { LOCALE_COOKIE, defaultLocale, isValidLocale } from "@/lib/i18n.server";

export async function setLocale(formData) {
  const locale = formData.get("locale");
  const pathname = formData.get("pathname");
  const cookieStore = await cookies();

  cookieStore.set(LOCALE_COOKIE, isValidLocale(locale) ? locale : defaultLocale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });

  redirect(typeof pathname === "string" && pathname.startsWith("/") ? pathname : "/");
}
