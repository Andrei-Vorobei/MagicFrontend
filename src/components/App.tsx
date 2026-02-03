import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Outlet } from 'react-router';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import { createTheme, CSSProperties, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { NavBar } from './NavBar';

const theme = createTheme({
  // typography: {
  //   fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  //   fontSize: 16,
  //   subtitle1: {
  //     fontSize: 24
  //   },
  //   subtitle2: {
  //     fontSize: 20
  //   },
  // },
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

const containerStyles: CSSProperties = {
  backgroundColor: '#ffffffc0',
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
};

export const App: React.FC = () => {

  return (
    <DndProvider backend={HTML5Backend}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container sx={ containerStyles } disableGutters={true}>
          <NavBar />
          <Outlet />
        </Container>
      </ThemeProvider>
    </DndProvider>
  );
}
