import "./globals.css";

export const metadata = {
  title: "Wen Ying Portfolio",
  description: "Wen Ying Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
