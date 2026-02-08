import Footer from "@/Components/Footer/Footer";
import "./globals.css";
import { ThemedNav } from "@/Components/shared/ThemedNav";
import { ThemeProvider } from "@/Components/shared/ThemeProvider";

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
        <ThemeProvider>
          <ThemedNav />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
