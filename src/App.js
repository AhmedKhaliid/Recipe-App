
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import { createTheme, Stack, ThemeProvider } from '@mui/material';
import Detalis from './pages/Detalis';

const theme = createTheme({
  palette: {
    secondary: {
      main: '#873e6c'
    },
    primary: {
      main: '#873e6c'
    }
  }
});

const router = createBrowserRouter([
  {
    path: '/', element: <Root />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/addRecipe', element: <AddRecipe /> },
      { path: ':id', element: <Detalis /> }
    ]
  }
]);


function App() {
  return <Stack height={'100vh'} sx={{ backgroundColor: 'whitesmoke' }}>
    <Stack>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router}></RouterProvider>
      </ThemeProvider>
    </Stack>
  </Stack>
}

export default App;
