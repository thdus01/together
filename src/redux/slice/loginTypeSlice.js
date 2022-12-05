import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  checkLogin: 0,
};
const typeSlice = createSlice({
  name: 'loginType',
  initialState,
  reducers: {
    changeLoginType: (state, action) => {
      state.checkLogin = action.checkLogin;
    },
  },
});

// Action creators are generated for each case reducer function
export const typeActions = typeSlice.actions;

export default typeSlice.reducer;