import Footer from "@/Components/Footer/Footer";
import "./globals.css";
import { Nav } from "@/Components/Nav/Nav";

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
      <body>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
