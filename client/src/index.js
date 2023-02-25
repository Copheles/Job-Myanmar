import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";
import { Provider } from "react-redux";
import { store } from "./redux/store";

const styles = {
  global: (props) => ({
    body: {
      bg: mode("red.100", "gray.800")(props),
    },
  }),
};

const theme = extendTheme({
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  styles,
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Provider store={store}>
      <App />
    </Provider>
  </ChakraProvider>
);
