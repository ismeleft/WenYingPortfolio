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
      <head>
        <meta
          name="google-site-verification"
          content="no4Ae9fa8OqKLKQbgbxSZDOV70KT0whcMFc6Vbv3j4U"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
