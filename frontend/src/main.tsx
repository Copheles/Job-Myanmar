import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/Routes";
import { mode } from "@chakra-ui/theme-tools";
import { Provider } from "react-redux";
import { store } from "@redux/store";

const styles = {
  global: (props: any) => ({
    body: {
      bg: mode("gray.300", "gray.800")(props),
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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />

      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ChakraProvider>
  </StrictMode>
);
