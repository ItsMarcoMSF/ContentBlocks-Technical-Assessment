/* theme.ts */
import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
    colors: {
      brand: {
        100: "#f1e8fd",
        200: "#d5b9f8",
        300: "#d5b9f8",
        400: "#d5b9f8",
        500: "#812eeb",
        600: "#6714d1",
        700: "#5010a3",
        800: "#390b74",
        900: "#220746",
      },
    },
    fonts: {
      heading: 'var(--font-rubik)',
      body: 'var(--font-rubik)',
    }

});

export default theme;