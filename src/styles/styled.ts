import { Button, Modal, Table, Tree } from "antd";
import styled from "styled-components";

export const Container = styled.div`
	padding: 20px 20px;
	display: grid;
	grid-template-rows: auto auto 1fr;
	grid-row-gap: 10px;
	grid-column-gap: 10px;

	.materialTable,
	.logDetails,
	.commandDetails {
		padding: 1em;
		border-radius: 0.5rem;
		border: 1px solid #d5d8dd;
	}
	.materialTable {
		flex: 1;
		.ant-table-row-level-1 {
			display: none;
		}
	}
	.commandDetails {
		display: flex;
		gap: 78px;
	}
	.mainDetail {
		display: flex;
		justify-content: space-between;
		gap: 10px;
	}

	.title {
		margin-bottom: 0.5em;
		font-size: 16px;
		font-weight: 600;
	}
	.detailContainer {
		flex: 1;
	}

	.logDetails {
		display: flex;
		flex-direction: column;
		width: 30%;
	}
`;

export const Wrapper = styled.div`
	background: #fff;
	border-radius: 12px;
	padding: 12px;
	margin: 12px;
`;

export const TableStyled = styled(Table)`
	table {
		border-spacing: 0 12px;
		background: #f5f5f5;
	}
	.ant-table-thead > tr > th {
		background: #f5f5f5 !important;
		color: #636868;
		padding: 10px 16px 0px;
		font-weight: 500;
		border-bottom: none;
	}

	.ant-table-tbody > tr {
		background: #f5f5f5;
	}

	.ant-table-tbody > tr > td {
		&:first-child {
			border-bottom-left-radius: 8px;
			border-top-left-radius: 8px;
		}

		&:last-child {
			border-bottom-right-radius: 8px;
			border-top-right-radius: 8px;
		}

		box-shadow: 0 2px 0px 0px rgba(61, 74, 72, 0.1);
		background: #fff !important;
		padding: 13px 16px;
	}
`;

export const WidthFlexBox = styled.div<{ $width?: string; $content?: string }>`
	display: flex;
	width: ${(props) => props.$width || ""};
	justify-content: ${(props) => props.$content || ""};
`;

export const PageTitle = styled.span`
	font-weight: 600;
	font-size: 18px;
	color: ${(prop) => prop.theme.primary_600};
`;
export const TreeStyled = styled(Tree)`
	.ant-tree-list-holder-inner {
		flex-direction: initial !important;
		flex-wrap: wrap;

		.ant-tree-treenode-switcher-open {
			flex-basis: 100%;
			margin-bottom: 20px;

			.ant-tree-title {
				color: ${(prop) => prop.theme.secondary_700} !important;
				font-weight: 600;
				font-size: 16px;
			}
		}

		.ant-tree-treenode-switcher-close {
			.ant-tree-title {
				font-size: 16px;
			}
			margin-bottom: 20px;
		}

		.ant-tree-switcher {
			display: none;
		}
	}
`;

export const TitleStyled = styled.div`
	color: ${(prop) => prop.theme.primary_700};
	font-weight: 600;
	font-size: 18px;
`;

export const TitleReport = styled.div`
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 10px;
	margin-bottom: 15px;

	.title {
		font-size: 22px;
		color: ${(prop) => prop.theme.primary_700};
		font-weight: 600;
	}
`;

export const WrapperReport = styled.div`
	margin-top: 70px;

	p {
		font-weight: bold;
		margin-bottom: 10px;
		font-size: 18px;
	}
`;

export const HeaderTable = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 10px;
`;

export const BtnAddItem = styled(Button)`
	background-color: #dff3e4;
	color: #009532;
	font-size: 16px;
	font-weight: 700;
	border: none;
	width: 50px !important;

	&:hover {
		background-color: rgb(8, 224, 80) !important;
		color: #fff !important;
	}
`;

export const ModalDetail = styled(Modal)`
	.ant-modal-body {
		height: 82vh;
		overflow-y: auto;

		&::-webkit-scrollbar {
			width: 15px;
			height: 15px;
			border-radius: 5.5px;
			left: -0.5rem;
		}
		&::-webkit-scrollbar-track {
			background: #f1f1f1;
			border-radius: 5.5px;
			width: 15px;
		}
		&::-webkit-scrollbar-thumb {
			background: #c4c4c4;
			border-radius: 5.5px;
		}
		&::-webkit-scrollbar-thumb:hover {
			background: #c4c4c4;
		}
	}
`;
