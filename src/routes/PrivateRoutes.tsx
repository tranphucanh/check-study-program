// Libraries
import React from "react";
import { Navigate, useLocation } from 'react-router-dom'

// Layout
import Layouts from "@/layouts";

export type PrivateRouteProps = {
	children: React.ReactElement;
	isAuthenticated?: boolean;
};

const PrivateRoutes = ({ children, isAuthenticated }: PrivateRouteProps) => {
	const location = useLocation()

	return isAuthenticated ? (
		<Layouts>{children}</Layouts>
	) : (
		<Navigate to={'/login'} state={{ from: location }} replace />
	)
};

export default PrivateRoutes;
