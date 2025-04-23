import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'auth',
  initialState: {
    temp:" ", 
  },
  reducers: {
    setTemp: (state, action) => {
      state.temp = action.payload;
    },

  },
});

export const { setTemp} = userSlice.actions;
export default userSlice.reducer;
