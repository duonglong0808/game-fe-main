import { createSlice } from '@reduxjs/toolkit';

interface SettingAppSlice {
  mood: string;
  isLoading: boolean;
  titleMessage: string;
  descMessage: string;
  showIconClosed: boolean;
  textConfirm: string;
  textClose: string;
  isContentHtml: boolean;
}

const settingAppSlice = createSlice({
  name: 'settingApp',
  initialState: {
    mood: 'dark',
    titleMessage: '',
    descMessage: '',
    textConfirm: '',
    textClose: '',
    showIconClosed: false,
    isContentHtml: false,
    isLoading: false,
  } as SettingAppSlice,
  reducers: {
    setMoodApp: (state, action) => {
      state.mood = action.payload;
    },
    setMessageApp: (
      state,
      action: {
        payload: {
          titleMessage: string;
          descMessage: string;
          textConfirm: string;
          textClose: string;
          showIconClosed?: boolean;
          isContentHtml?: boolean;
        };
      }
    ) => {
      state.titleMessage = action.payload?.titleMessage;
      state.descMessage = action.payload?.descMessage;
      state.textConfirm = action.payload?.textConfirm;
      state.textClose = action.payload?.textClose;

      if (action.payload?.showIconClosed != undefined)
        state.showIconClosed = action.payload?.showIconClosed;
      if (action.payload?.isContentHtml != undefined)
        state.isContentHtml = action.payload?.isContentHtml;
    },
    cleanDataMessage: (state, action) => {
      state.titleMessage = '';
      state.descMessage = '';
      state.textConfirm = '';
      state.textClose = '';
      state.isContentHtml = false;
      state.showIconClosed = false;
    },
    setLoadingApp(state, action: { payload: { loading: boolean } }) {
      state.isLoading = action.payload.loading;
    },
  },
});

export const { setMoodApp, setMessageApp, cleanDataMessage, setLoadingApp } =
  settingAppSlice.actions;

export default settingAppSlice.reducer;
