import axios, { AxiosError, AxiosResponse } from "axios";
import { getCookie } from "@/utility";
import {
	API_AUTH,
	TOKEN_KEY,
} from "@/utility/constants";
import { openNotification } from "@/utility/notifyToastify";
import { NotifyEnums } from "./enum";
import { handleError } from "./handleError";

enum REQUEST_TIMEOUT {
	default = 0,
}

const requestAuth = axios.create({
	baseURL:
		import.meta.env.VITE_API_URL +
		API_AUTH,
	timeout: REQUEST_TIMEOUT.default,
});

const InterceptorsRequest = (config: any) => {
	const token = getCookie(TOKEN_KEY);

	let Authorization = `Bearer ${token || ""}`;

	if (token) {
		Authorization = `Bearer ${token}`;
	}

	config.headers = {
		...config.headers,
		Authorization,
	};

	return config;
};

const InterceptorResponse = async (response: AxiosResponse) => {
	if (response && response.data) {
		return response.data;
	}

	return null;
};

const InterceptorsError = async (error: AxiosError<any>) => {
	if (error && error.response?.data) {
		const { statusCode = 400, message = "" } = error.response?.data;

		handleError(statusCode, message.toString());
		openNotification({
			type: NotifyEnums.ERROR,
			message: message.toString(),
		});
	}

	if (!error?.response) {
		openNotification({
			type: NotifyEnums.ERROR,
			message: error.message,
		});
	}

	// return error
};

requestAuth.interceptors.request.use(InterceptorsRequest, InterceptorsError);
requestAuth.interceptors.response.use(InterceptorResponse, InterceptorsError);

export { requestAuth };

