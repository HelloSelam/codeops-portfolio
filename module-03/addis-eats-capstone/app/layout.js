import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { getSession } from "../lib/session";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  title: {
    default: "Addis Eats | Ethiopian Food",
    template: "%s | Addis Eats",
  },
  description:
    "Explore Ethiopian dishes and order your favorites with Addis Eats.",
  openGraph: {
    title: "Addis Eats",
    description: "Discover delicious Ethiopian food.",
    siteName: "Addis Eats",
    type: "website",
    images: ["/images/og-image.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats",
    description: "Discover delicious Ethiopian food.",
    images: ["/images/og-image.png"],
  },
};

export default async function RootLayout({ children }) {
  const session = await getSession();
  
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <Navbar session={session} />
          {children}
        </Providers>
      </body>
    </html>
  );
}