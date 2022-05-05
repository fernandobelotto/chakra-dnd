import { Box, Heading } from "@chakra-ui/react";
import Board from "./components/Board";

export default function App() {
  return (
    <>
      <Box p={5}>
        <Heading mb={5}>Drag&Drop Board ChakraUI</Heading>
        <Board />
      </Box>
    </>
  );
}
