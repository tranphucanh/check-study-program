import { Button, Form } from "antd";
import "./styles.scss";
import FormContainer from "@/components/FormContainer";
import { TYPE_COMPONENT } from "@/utility/enum";
import { ILogin } from "@/models";
import { loginApi } from "@/services";

// interface ILogin 

const fields = [{
	name: "username",
	label: "MSSV",
	placeholder: 'MSSV',
	sizeSpan: 24,
	type: TYPE_COMPONENT.INPUT,
},{
	name: "password",
	label: "Password",
	sizeSpan: 24,
	type: TYPE_COMPONENT.INPUT,
},
]

const LoginForm = () => {
	const onSubmit = async ({ username, password }: ILogin) => {
		const res = await loginApi({ username, password, type: 0 });
	}
	return (
		<div className="login-form">
			<h1>LOGIN FOR MORE</h1>
			<Form onFinish={onSubmit}>
				<FormContainer fields={fields}/>
				<Button htmlType="submit">Đăng nhập</Button>
			</Form>
		</div>
	);
};

export default LoginForm;
