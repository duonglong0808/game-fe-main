import { createSlice } from '@reduxjs/toolkit';

interface UserSlice {
  userName: string;
  userId: string;
  name: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userId: '',
    name: '',
  } as UserSlice,
  reducers: {
    setDataUserLogin(state, action) {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
    },
    logOutUser(state) {
      state.userName = '';
      state.name = '';
      state.userId = '';
    },
  },
});

export const { setDataUserLogin, logOutUser } = userSlice.actions;

export default userSlice.reducer;
