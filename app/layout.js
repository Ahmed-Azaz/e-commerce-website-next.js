import Footer from "@/components/Footer";
import { getDirection, getLocale, getMessages } from "@/lib/i18n.server";
import Navbar from "@/components/Navbar";
import ThemeRegistry from "./ThemeRegistry";
import "./globals.css";

export async function generateMetadata() {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return {
    title: messages.metadata.title,
    description: messages.metadata.description,
  };
}

export default async function RootLayout({ children }) {
  const locale = await getLocale();
  const messages = await getMessages(locale);

  return (
    <html lang={locale} dir={getDirection(locale)}>
      <body>
        <ThemeRegistry>
          <Navbar locale={locale} messages={messages} />
          <main className="site-main">{children}</main>
          <Footer messages={messages} />
        </ThemeRegistry>
      </body>
    </html>
  );
}
