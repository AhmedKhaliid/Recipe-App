
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';

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
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
