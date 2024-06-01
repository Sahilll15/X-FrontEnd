import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider clientId="845881307566-uasu6329fuuvatk64b492lq58h06kdao.apps.googleusercontent.com">
      <Component {...pageProps} />
    </GoogleOAuthProvider>
  );
}
