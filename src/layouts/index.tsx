import React from "react";
import { Layout } from "antd";

interface LayoutTemplateProps {
	children: React.ReactNode;
}

const LayoutTemplate: React.FC<LayoutTemplateProps> = ({ children }) => {
	return (
		<Layout>
			{children}
		</Layout>
	);
};

export default LayoutTemplate;
