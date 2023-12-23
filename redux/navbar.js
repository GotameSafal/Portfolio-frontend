const { createSlice } = require("@reduxjs/toolkit");

const navbar = createSlice({
  name: "navbar",
  initialState: {
    screen: null,
    bar: false,
  },
  reducers: {
    setScreen(state, action) {
      state.screen = action.payload;
    },
    turnOnNavbar(state, action) {
      state.bar = true;
    },
    turnOffNavbar(state, action) {
      state.bar = false;
    },
  },
});
export default navbar.reducer;
export const { setScreen, turnOffNavbar, turnOnNavbar } = navbar.actions;
export const navbarState = (state) => state.navbar;
