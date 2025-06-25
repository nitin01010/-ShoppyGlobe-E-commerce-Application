import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Home from './components/Home';
import ProductsDetails from './components/ProductsDetails';
import ProductCart from './components/productCart';
import './style/index.css';
import store from './store/store';
import Login from './components/Login';
import SignupPage from './components/Signup';
import ErrorPage from './components/ErrorPage';
import HomePage from './home/HomePage';

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "product/:id",
        element: <ProductsDetails />,
      },
      {
        path: "products/cart",
        element: <ProductCart />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
