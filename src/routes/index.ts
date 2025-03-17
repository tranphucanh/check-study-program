// Libraries
import React, { FC, lazy } from "react";

// Utils
import { path } from "@/utility/path";

const Home = lazy(() => import("@/page/Home"));
const NotFound = lazy(() => import("@/page/NotFound"));

interface IRoutes {
	path: string;
	component: React.LazyExoticComponent<FC<any>>;
	children?: {
		path: string;
		component: React.LazyExoticComponent<FC<any>>;
		children?: any[];
	}[];
	keyPermission?: string;
}

const routes: IRoutes[] = [
	{
		path: path.HOME,
		component: Home,
	},
	{
		path: path.NOT_FOUND,
		component: NotFound,
	},
];

export default routes;
