"use client";

import { getCategoryLabel as getCategoryLabelUtil, getMessages as getMessagesUtil } from "@/lib/i18n.utils";

export function getMessages(locale = "en") {
  return getMessagesUtil(locale);
}

export function getCategoryLabel(category, dictionary) {
  return getCategoryLabelUtil(category, dictionary);
}
