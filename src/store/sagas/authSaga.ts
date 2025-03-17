import { fork, put } from "redux-saga/effects";
import { getCookie } from "@/utility";
import { TOKEN_KEY } from "@/utility/constants";
import { authActions } from "@/store/reducers/authenSlice";

function* loginFlow() {
	const token = getCookie(TOKEN_KEY) || "";
	const isAuth = Boolean(token);
	yield put(authActions.setAuthentication({ isAuthenticated: isAuth }));
}

export default function* authSaga() {
	yield fork(loginFlow);
}
