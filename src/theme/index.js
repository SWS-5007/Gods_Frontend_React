import { experimental_extendTheme } from '@mui/material';

let theme = experimental_extendTheme({
  palette: {
    body: {
      main: '#000',
    },
    primary: { main: '#1ca1d9', contrastText: '#fff' },
    secondary: { main: '#222730' },
    tertiary: { main: '#9198a6' },
    background: {
      default: '#fff',
      main: '#f9f8e8',
      dark: '#222730',
      gray: '#eff0f4',
    },
    text: {
      primary: '#000',
      secondary: '#1ca1d9',
      tertiary: '#9198a6',
    },
    invert: {
      main: '#fff',
    },
    border: {
      main: '#ccc',
    },
  },
  typography: {
    fontFamily: "'Montserrat', sans-serif",
  },
  button: {
    borderRadius: '80px',
  },
  swiper: {
    navigation: {
      size: 24,
    },
  },
  cssVarPrefix: '',
});

export default theme;
