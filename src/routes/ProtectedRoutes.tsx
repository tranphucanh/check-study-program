// Libraries
import React, { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import { Loading } from "@/components";

import routes from "./";

const ProtectedRoutes: React.FC = () => {
	return (
		<Suspense fallback={<Loading />}>
			<Routes>
				{routes.map(({ component: Component, path }) => (
					<Route path={path} key={path} element={<Component />} />
				))}
			</Routes>
		</Suspense>
	);
};

export default ProtectedRoutes;
