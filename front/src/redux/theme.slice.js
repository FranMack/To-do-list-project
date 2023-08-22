import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   bgColor:"white",
   textColor:"gray"
  };



  const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
      setTheme: (state, action) => {
        
        console.log("theme",action.payload)
        
        return action.payload;
      },
    },
  });
  
  export const { setTheme } = themeSlice.actions;
  export default themeSlice.reducer;