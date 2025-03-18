import { requestAuth } from "@/utility/request";

// Models
import { ILogin } from "@/models";

export const loginApi = (data: ILogin): Promise<any> => {
	return requestAuth({
		url: "/authenticate/authpsc",
		method: "POST",
		data,
	});
};

export const studyProgramApi = (): Promise<any> => {
	return requestAuth({
		url: "/student/studyProgram",
		method: "GET",
		params: {StudyProgramID: '1A223002'}
	});
}
