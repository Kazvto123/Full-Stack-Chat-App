import Sidebar from "../../components/sidebar"
import { Avatar, Flex } from "@chakra-ui/react"

const Topbar = () => {
    return (
        <Flex 
        bg='gray.100'
        h='81px'
        w='100%'
        align={'center'}>
            <Avatar src="" />
        </Flex>
    )
}

export default function Chat(){
    return (
        <Flex
            h="100vh"
            >
            <Sidebar />
            <Flex
                flex={1}>

                    <Topbar />


            </Flex>
        </Flex>
    )
    
}