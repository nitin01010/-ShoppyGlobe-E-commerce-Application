import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { Analytics } from '@vercel/analytics/react';

import store from './store/store';
import appRouter from './routes';          
import './style/index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={appRouter} />
      <Analytics />
      <ToastContainer />
    </Provider>
  </StrictMode>
);
