import Login from "../components/login"
import { ChakraProvider, Spinner, Center } from "@chakra-ui/react"
import Sidebar from "../components/sidebar"
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from "@/firebaseconfig";

export default function App({ Component, pageProps }) {
  // return <Component {...pageProps} />;

  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return (
      <ChakraProvider>
        <Center h='100vh'>
        <Spinner size='xl'/>
        </Center>
      </ChakraProvider>
    )
  }
  if(!user) {
    return (
      <ChakraProvider>
        <Login/>
      </ChakraProvider>
    )
  }

  return (
    <ChakraProvider>
      <Component {...pageProps} />
      </ChakraProvider>
    
)
}

