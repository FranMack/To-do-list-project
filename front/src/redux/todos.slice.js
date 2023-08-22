import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  task: null,
  listId: null,
  complete: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      return action.payload;
    },
  },
});

export const { setTodos } = todosSlice.actions;
export default todosSlice.reducer;
