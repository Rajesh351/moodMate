import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice'; // Import the reducer correctly

export default configureStore({
  reducer: {
    auth: userReducer, // Key 'auth' is being mapped correctly
  },
});
