import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { SessionProvider } from "next-auth/react";

const activeChain = "sepolia";

function MyApp({ Component, pageProps }: AppProps) {
  // NextAuth session comes from pageProps
  const { session, ...rest } = pageProps;

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <Navbar />
        <Component {...rest} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;


