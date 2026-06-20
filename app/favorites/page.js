import FavoritesView from "@/components/FavoritesView";
import { getLocale, getMessages } from "@/lib/i18n.server";

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return <FavoritesView messages={messages.favorites} />;
}
