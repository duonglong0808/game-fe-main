import { createSlice } from '@reduxjs/toolkit';

interface PointItem {
  gamePointId: number;
  gameSlug: string;
  gameName: string;
  points: number;
}
interface UserSlice {
  userName: string;
  userId: string;
  name: string;
  phone: string;
  isFetchPoint: boolean;
  dataGamePoints: PointItem[];
}

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userName: '',
    userId: '',
    name: '',
    phone: '',
    dataGamePoints: [],
    isFetchPoint: true,
    mainPoint: 0,
    gamePointKu: 0,
  } as UserSlice,
  reducers: {
    setDataUserLogin(state, action) {
      state.name = action.payload.name;
      state.userId = action.payload.id;
      state.userName = action.payload.username;
      state.phone = action.payload.phone;
    },
    logOutUser(state) {
      state.userName = '';
      state.name = '';
      state.userId = '';
      state.dataGamePoints = [];
    },
    setDataGamePoint(state, action) {
      state.dataGamePoints = action.payload?.data;
      state.isFetchPoint = false;
    },
    setFetchingDataPoint(state, action) {
      state.isFetchPoint = action.payload.isFetchPoint;
    },
  },
});

export const { setDataUserLogin, logOutUser, setDataGamePoint, setFetchingDataPoint } =
  userSlice.actions;

export default userSlice.reducer;
