// app/layout.js
import "./globals.css";

export const metadata = {
  title: "Wen Ying Portfolio",
  description: "Wen Ying Portfolio",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
