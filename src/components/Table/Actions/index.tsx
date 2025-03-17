// Libraries
import React from "react";
import { Space, Tooltip } from "antd";

// Icon
import {
	DeleteTwoTone,
	EditTwoTone,
	EllipsisOutlined,
} from "@ant-design/icons";

// Styles
import { theme } from "@/styles/theme";

// Utils
import { labelAction } from "../constants";
import { ACTION_ENUM } from "@/utility/enum";

interface IAction {
	types?: string[];
	onClick?: (type: string) => void;
	hideAction?: string[];
}

const Action: React.FC<IAction> = ({ types, onClick, hideAction }) => {
	const renderBtnAction = () => {
		if (types && types.length) {
			return types.map((type) => {
				let itemElm = <></>;

				switch (type) {
					case ACTION_ENUM.EDIT:
						itemElm = hideAction?.includes(type) ? <></> : <EditTwoTone />;
						break;

					case ACTION_ENUM.DELETE:
						itemElm = hideAction?.includes(type) ? (
							<></>
						) : (
							<DeleteTwoTone twoToneColor={theme.red5} />
						);
						break;

					case ACTION_ENUM.MORE:
						itemElm = hideAction?.includes(type) ? (
							<></>
						) : (
							<EllipsisOutlined style={{ fontSize: 16 }} />
						);
						break;
				}

				return (
					<Tooltip key={type} title={labelAction[type]}>
						<div
							style={{ fontSize: 14, cursor: "pointer" }}
							onClick={() => onClick?.(type)}
						>
							{itemElm}
						</div>
					</Tooltip>
				);
			});
		} else return null;
	};

	return <Space size={20}>{renderBtnAction()}</Space>;
};

export default Action;
