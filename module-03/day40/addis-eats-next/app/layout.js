export const metadata = {
  title: "Addis-Eats",
  description: "order delicious Ethiopian food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{ children }</body>
    </html>
  );
}