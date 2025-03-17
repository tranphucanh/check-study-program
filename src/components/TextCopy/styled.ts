import { Typography } from "antd";
import styled from "styled-components";
import { CheckOutlined } from "@ant-design/icons";

const { Paragraph } = Typography;
export const StyledParagraph = styled(Paragraph)`
	font-size: 16px;
	font-weight: 600;
	color: #1d5eff;
	height: 26px;
`;

export const StyledIcon = styled.img`
	color: #d5d8dd;
`;

export const StyledCheckedIcon = styled(CheckOutlined)`
	width: 21px;
	height: 21px;
	color: #22b049;
`;
