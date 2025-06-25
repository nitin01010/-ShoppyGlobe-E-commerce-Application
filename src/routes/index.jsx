import { createBrowserRouter } from 'react-router-dom';

import HomePage        from '../home/HomePage';
import Home            from '../pages/Home';
import ProductsDetails from '../pages/ProductsDetails';
import ProductCart     from '../pages/ProductCart';
import Login           from '../pages/Login';
import SignupPage      from '../pages/SignupPage';
import ErrorPage       from '../pages/ErrorPage';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { index: true,       element: <Home /> },
      { path: 'product/:id', element: <ProductsDetails /> },
      { path: 'products/cart', element: <ProductCart /> },
      { path: 'login',     element: <Login /> },
      { path: 'signup',    element: <SignupPage /> }
    ],
  },
  { path: '*', element: <ErrorPage /> }
]);

export default appRouter;
