import { RootState } from "..";

// Auth
export const isAuthenticatedSelector = (state: RootState) =>
	state.auth.isAuthenticated;
