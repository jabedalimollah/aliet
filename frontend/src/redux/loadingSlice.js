import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allPostLoading: false,
  suggestedUsersLoading: false,
  profileLoading: false,
  messageLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setAllPostLoading: (state, action) => {
      state.allPostLoading = action.payload;
    },
    setSuggestedUsersLoading: (state, action) => {
      state.suggestedUsersLoading = action.payload;
    },
    setProfileLoading: (state, action) => {
      state.profileLoading = action.payload;
    },
    setMessageLoading: (state, action) => {
      state.messageLoading = action.payload;
    },
  },
});

export const {
  setAllPostLoading,
  setSuggestedUsersLoading,
  setProfileLoading,
  setMessageLoading,
} = loadingSlice.actions;

export default loadingSlice.reducer;
