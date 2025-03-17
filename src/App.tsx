// Libraries
import React, { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";

// Hooks
import { useAppSelector } from "@/hooks";

// Styles
import "antd/dist/reset.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/common.scss";

// Page

// Routes
import ProtectedRoutes from "@/routes/ProtectedRoutes";
import PrivateRoutes from "@/routes/PrivateRoutes";

// Store
import { isAuthenticatedSelector } from "@/store/selectors";

const App: React.FC = () => {
	const isAuthenticated = useAppSelector(isAuthenticatedSelector);

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
			<Route path='/login' element={<Login />} />
				<Route
					path="*"
					element={
						<PrivateRoutes isAuthenticated={isAuthenticated}>
							<ProtectedRoutes />
						</PrivateRoutes>
					}
				/>
			</Routes>
			<ToastContainer />
		</Fragment>
	);
};

export default App;
