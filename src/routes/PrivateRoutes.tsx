// Libraries
import React from "react";

// Layout
import Layouts from "@/layouts";

export type PrivateRouteProps = {
	children: React.ReactElement;
	isAuthenticated?: boolean;
};

const PrivateRoutes = ({ children }: PrivateRouteProps) => {

	return <Layouts>{children}</Layouts>
};

export default PrivateRoutes;
