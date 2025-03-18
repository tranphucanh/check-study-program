// Libraries
import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Styles
import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/common.scss";

// Page
import Home from "@/page/Home";

const App: React.FC = () => {
	useEffect(() => {
		const ele = document.getElementById("vt-progress-indicator");
		if (ele) {
			ele.classList.add("available");
			setTimeout(() => {
				ele.outerHTML = "";
			}, 2000);
		}
	}, []);

	return (
		<Fragment>
			<Routes>
				<Route path="/" element={<Home />} />
			</Routes>
			<ToastContainer />
		</Fragment>
	);
};

export default App;
