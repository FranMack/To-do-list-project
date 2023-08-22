import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user.slice";
import todosSlice from "./todos.slice";
import themeSlice from "./theme.slice";


const store = configureStore({
    reducer: {
        user:userSlice,
        todos:todosSlice,
        theme:themeSlice
     },
  });
  
  export default store;


  