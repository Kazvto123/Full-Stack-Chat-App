import Login from "../components/login"
import { ChakraProvider } from "@chakra-ui/react"

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  return (
    <ChakraProvider>
      <Login />
      </ChakraProvider>
    
)
}

