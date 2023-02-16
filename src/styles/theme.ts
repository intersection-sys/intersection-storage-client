import { extendTheme, ThemeConfig } from '@chakra-ui/react';

const colors = {
  brand: {
    green: {
      '500': '#06D7A1',
      '600': '#2FB592',
    },
    pink: {
      '500': '#EA4972',
    },
    blue: {
      '50': 'rgba(211, 200, 255, 0.15)',
      '500': '#5057FF',
      '700': '#293056',
    },
    purple: {
      '200': 'rgba(112, 78, 249, 0.37)'
    },
    red: {
      '500': '#FF6969',
    },
    light: {
      // background: "#fafafa",
      background: "#EFF0F4",
      box: "#fff",
    },
    dark: {
      background: "#201F24",
      box: "#2B2A2E",
    },
    white: "#FFFFFF",
  },
}

const styles = {
  global: {
    '::-webkit-scrollbar': {
      width: '8px',
      padding: '1px',
    },

    /* Track */
    '::-webkit-scrollbar-track': {
      background: 'transparent',
    },

    /* Handle */
    '::-webkit-scrollbar-thumb': {
      background: '#293056',
    },

    /* Handle on hover */
    '::-webkit-scrollbar-thumb:hover': {
      background: '#f2f5fe',
    },
    body: {
      overflowX: 'hidden',
      background: "gray.100",
      color: "gray.900",
      fontFamily: 'Poppins',
      "--webkit-font-smoothing": "antialiased",
    },
  },
}

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: true,
}

export const theme = extendTheme({ styles, colors, config })