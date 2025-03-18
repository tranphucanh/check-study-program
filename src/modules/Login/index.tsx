// src/App.js
import "./styles.scss";
import Globe from "./Globe";
import LoginForm from "./LoginForm";

function Login() {
	return (
		<div className="login">
			<Globe />
			<LoginForm />
		</div>
	);
}

export default Login;
