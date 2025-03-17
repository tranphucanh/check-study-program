import "./styles.scss";

const LoginForm = () => {
	return (
		<div className="contact-form">
			<h1>Get in touch</h1>
			<h2>Contact.</h2>
			<form>
				<label>Your name</label>
				<input type="text" placeholder="What's your name?" />

				<label>Your email</label>
				<input type="email" placeholder="What's your email?" />

				<label>Your message</label>
				<textarea placeholder="What do you want to say?" />

				<button type="submit">Send</button>
			</form>
		</div>
	);
};

export default LoginForm;
