import { createSlice } from "@reduxjs/toolkit";

export const LoggedinReducer = createSlice({
    name: "loggedin",
    initialState: {
        value: false,
    },
    reducers: {
        login: (state) => {
            state.value = true;
        },
        logout: (state) => {
            state.value = false;
        },
    },
});

export const { login, logout } = LoggedinReducer.actions;

export default LoggedinReducer.reducer;