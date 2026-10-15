import "./globals.css";
import Providers from "../components/Providers";
import Navbar from "../components/Navbar";

export const metadata = {
  title: "Addis-Eats",
  description: "order delicious Ethiopian food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}