import "./globals.css";
import Providers from "../components/Providers";

export const metadata = {
  title: "Addis-Eats",
  description: "order delicious Ethiopian food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}