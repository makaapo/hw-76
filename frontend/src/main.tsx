import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux';
import 'react-toastify/dist/ReactToastify.min.css';
import {store} from './app/store';
import {ToastContainer} from 'react-toastify';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ToastContainer position="bottom-left" />
      <App />
    </Provider>
  </StrictMode>
)
