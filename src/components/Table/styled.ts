import styled from "styled-components";
import { CheckOutlined } from "@ant-design/icons";

export const StyledIcon = styled.img`
	color: #d5d8dd;
`;

export const StyledLink = styled.div`
	font-size: 14px;
	font-weight: 600;
	cursor: pointer;
	color: #1677ff;
	text-decoration: underline;

	.ant-typography {
		height: 24px !important;
		margin-bottom: 0 !important;
		color: #1677ff;
	}
`;

export const StyledCheckedIcon = styled(CheckOutlined)`
	width: 21px;
	height: 21px;
	color: #22b049;
`;

export const StyledCell = styled.span`
	font-weight: 500;
	color: ${(prop) => prop.theme.primary_700};
`;
