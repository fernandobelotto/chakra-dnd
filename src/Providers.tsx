import { Provider } from "react-redux";
import { store } from "./store";
import { ChakraProvider, extendTheme, Heading } from "@chakra-ui/react";
import App from "./App";

const colors = {
  brand: {
    900: "#1a365d",
    800: "#153e75",
    700: "#2a69ac",
  },
};

const theme = extendTheme({ colors });

export default function Providers() {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    </Provider>
  );
}
