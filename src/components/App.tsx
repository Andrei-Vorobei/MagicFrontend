import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Outlet } from 'react-router';
import { createTheme, ThemeProvider } from '@material-ui/core/';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { NavBar } from './NavBar';

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16,
    subtitle1: {
      fontSize: 24
    },
    subtitle2: {
      fontSize: 20
    },
  },
  // palette: {
  //   success: {
  //     main: '#2e7d32',
  //     contrastText: '#fff',
  //   },
  //   warning: {
  //     main: '#fff700',
  //     contrastText: '#000'
  //   }
  // },
});

const containerStyles = {
  backgroundColor: '#ffffffb8',
  height: '100%',
};

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container sx={ containerStyles } disableGutters={true}>
        <NavBar />
        <Outlet />
      </Container>
    </ThemeProvider>
  );
}
