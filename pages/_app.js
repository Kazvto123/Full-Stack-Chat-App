import Login from "../components/login"
import { ChakraProvider } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  return (
    <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    
)
}

