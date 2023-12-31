import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: null,
  name: null,
  username: null,
  url_img:null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
     /*if (action.payload === null) {
				localStorage.removeItem('token');
			} else {
				if (action.payload.token) {
					localStorage.setItem('token', action.payload.token);
				}
			}*/
			return action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;