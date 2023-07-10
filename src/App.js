
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import { createTheme, ThemeProvider } from '@mui/material';



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
    errorElement: <ErrorPage />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/addRecipe', element: <AddRecipe /> }
    ]
  }
]);


function App() {
  return <ThemeProvider theme={theme}>
    <RouterProvider router={router}></RouterProvider>
  </ThemeProvider>
}

export default App;
