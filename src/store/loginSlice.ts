import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit"

interface LoginState {
    username: string;
    password: string;
    isLoggedIn: boolean;
}

const initialState: LoginState = {
    username: '',
    password: '',
    isLoggedIn: false,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        setUsername(state, action: PayloadAction<string>) {
            state.username = action.payload;
        },

        setPassword(state, action: PayloadAction<string>) {
            state.password = action.payload;
        },

        login(state) {
            state.isLoggedIn = true;
        },

        logout(state) {
            state.isLoggedIn = false;
            state.username = "";
            state.password = "";
        },
    }
});

export const { setUsername, setPassword, login, logout } = loginSlice.actions;
export default loginSlice.reducer