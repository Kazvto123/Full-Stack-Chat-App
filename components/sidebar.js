import { ArrowLeftIcon } from "@chakra-ui/icons";
import { Avatar, Button, Flex, IconButton, Text } from "@chakra-ui/react";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseconfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { query, collection } from "firebase/firestore";
import { db } from "../firebaseconfig";
import getOtherEmail from "@/getOtherEmail";
import { useRouter } from "next/router";
import { addDoc } from "firebase/firestore";

export default function sidebar() {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const chats = snapshot?.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const router = useRouter();

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("Enter the recipient's email:");
    if (!chatExists(input) && input !== user.email) {
      await addDoc(collection(db, "chats"), { users: [user.email, input] });
    }
  };

  const redirect = (id) => {
    router.push(`/chat/${id}`);
  };

  const chatList = () => {
    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={Math.random()}
          p={3}
          align="center"
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd={3} />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

  return (
    <Flex
      // bg="blue.100"
      w="300px"
      h="100%"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction={"column"}
    >
      <Flex
        h="81px"
        w="100%"
        // bg="red.100"
        align="center"
        justifyContent="space-between"
        borderBottom={"1px solid"}
        borderColor={"gray.200"}
        p={3}
      >
        <Flex align="center">
          <Avatar src={user.photoURL} marginEnd={3} />
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          size="sm"
          isRound
          icon={<ArrowLeftIcon />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Button m={5} p={4} onClick={() => newChat()}>
        New Chat
      </Button>

      <Flex
        overflowX="scroll"
        direction="column"
        sx={{ scrollbarWidth: "none" }}
        flex={1}
      >
        {chatList()}
      </Flex>
    </Flex>
  );
}
