import "../app/globals.css";
import { Nav } from "@/Components/Nav/Nav";

export default function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Nav />
      <Component {...pageProps} />
    </div>
  );
}
