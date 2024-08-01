import Sidebar from "../../components/sidebar";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { query, collection } from "firebase/firestore";
import { db } from "@/firebaseconfig";
import { orderBy } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebaseconfig";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { doc } from "firebase/firestore";
import getOtherEmail from "@/getOtherEmail";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align={"center"} p={5}>
      <Avatar src="" marginEnd={3} />
      <Heading size="lg">{email}</Heading>
    </Flex>
  );
};

const Bottombar = () => {
  return (
    <FormControl p={3}>
      <Input placeholder="Type a message..." />
      <Button type="submit" hidden autoComplete="off">
        Submit
      </Button>
    </FormControl>
  );
};
export default function Chat() {
  const router = useRouter();
  const { id } = router.query;

  const [user] = useAuthState(auth);

  const q = query(collection(db, `chats/${id}/messages`), orderBy("timestamp"));
  const [messages] = useCollectionData(q);

  const [chat] = useDocumentData(doc(db, "chats", id));

  const getMessages = () =>
    messages?.map((msg) => {
      const sender = msg.sender === user.email;

      return (
        <Flex
          key={Math.random()}
          alignSelf={sender ? "flex-start" : "flex-end"}
          bg={sender ? "blue.500" : "green.500"}
          w="fit-content"
          minWidth="100px"
          borderRadius="lg"
          p={3}
          m={1}
        >
          <Text>{msg.text}</Text>
        </Flex>
      );
    });

  return (
    <Flex h="100vh">
      <Sidebar />
      <Flex flex={1} direction={"column"}>
        <Topbar email={getOtherEmail(chat?.users, user)} />
        <Flex
          flex={1}
          direction="column"
          pt={4}
          mx={5}
          overflowx="scroll"
          sx={{ scrollbarwidth: "none`" }}
        >
          {getMessages()}
        </Flex>

        <Bottombar />
      </Flex>
    </Flex>
  );
}
