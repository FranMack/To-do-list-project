import './App.css';
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import "./index.css";
import 'bulma/css/bulma.min.css'
import { BrowserRouter } from "react-router-dom";
import { TodosProvider } from './context/todos.context.jsx';
import { Provider } from "react-redux";
import store from './redux/store.js';


const target=document.getElementById('root');

ReactDOM.createRoot(target).render(
  <React.StrictMode>
      <Provider store={store}>
    <BrowserRouter>
 
      <TodosProvider>
    <App />
    </TodosProvider>

    </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
