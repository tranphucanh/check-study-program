import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface authState {
	isAuthenticated: boolean;
}

const initialState: authState = {
	isAuthenticated: false,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuthentication: (
			state,
			action: PayloadAction<{ isAuthenticated: boolean }>
		) => {
			state.isAuthenticated = action.payload.isAuthenticated;
		},
	},
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
