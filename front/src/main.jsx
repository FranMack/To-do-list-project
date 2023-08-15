import './App.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import 'bulma/css/bulma.min.css'
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from './context/user.context.jsx';
import { TodosProvider } from './context/todos.context.jsx';
import { Provider } from "react-redux";
import store from './redux/store.js';


const target=document.getElementById('root');

ReactDOM.createRoot(target).render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter>
    <AuthProvider>
      <TodosProvider>
    <App />
    </TodosProvider>
    </AuthProvider>
    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
