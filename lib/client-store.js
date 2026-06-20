"use client";

const CART_KEY = "next-commerce-cart";
const FAVORITES_KEY = "next-commerce-favorites";
const STORE_EVENT = "next-commerce-store-change";

function canUseStorage() {
  return (
    typeof window !== "undefined" &&
    typeof window.localStorage !== "undefined"
  );
}

function readList(key) {
  if (!canUseStorage()) return [];

  try {
    const value = window.localStorage.getItem(key);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function writeList(key, items) {
  if (!canUseStorage()) return;

  window.localStorage.setItem(key, JSON.stringify(items));
  window.dispatchEvent(new Event(STORE_EVENT));
}

function toggleItem(key, product) {
  const items = readList(key);

  const exists = items.some((item) => item.id === product.id);

  const nextItems = exists
    ? items.filter((item) => item.id !== product.id)
    : [...items, product];

  writeList(key, nextItems);

  return nextItems;
}

function removeItem(key, id) {
  const nextItems = readList(key).filter((item) => item.id !== id);
  writeList(key, nextItems);
  return nextItems;
}

export function getCartItems() {
  return readList(CART_KEY);
}

export function getFavoriteItems() {
  return readList(FAVORITES_KEY);
}

export function toggleCartItem(product) {
  return toggleItem(CART_KEY, product);
}

export function toggleFavoriteItem(product) {
  return toggleItem(FAVORITES_KEY, product);
}

export function removeCartItem(id) {
  return removeItem(CART_KEY, id);
}

export function removeFavoriteItem(id) {
  return removeItem(FAVORITES_KEY, id);
}

export function subscribeToStore(callback) {
  if (typeof window === "undefined") return () => { };

  const handler = () => callback();

  window.addEventListener(STORE_EVENT, handler);
  window.addEventListener("storage", handler);

  return () => {
    window.removeEventListener(STORE_EVENT, handler);
    window.removeEventListener("storage", handler);
  };
}
