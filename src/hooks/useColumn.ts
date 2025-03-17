// Libraries

// Models
import { IColumn } from "@/models";

// Utils
import { TYPE_COMPONENT } from "@/utility/enum";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@/utility/constants";

export const useColumn = () => {
	const getColumn = (columns) => {
		if (!columns?.length) {
			return [];
		}
		const newColumns =
			columns.filter(
				(col) =>
					col?.type !== TYPE_COMPONENT.ACTIONS &&
					col?.type !== TYPE_COMPONENT.CUSTOM &&
					!col?.export
			) || [];
		// const newColumns =
		// 	columns.filter((col) => {
		// 		if (col?.type === TYPE_COMPONENT.ACTIONS) return false;
		// 		if (col?.type === TYPE_COMPONENT.CUSTOM && !col?.export) return false;
		// 		return true;
		// 	}) || [];
		return newColumns.map((item: IColumn) => {
			let newItem: any = {
				...item,
				dataIndex: item?.key || item?.field,
			};

			if (item?.children) {
				newItem = {
					...newItem,
					children: getColumn(item?.children),
				};
			}

			let render;

			if (item?.onCell) {
				render = (value, data, index) => {
					const dataOnCell: any = item?.onCell?.(data, index);

					return {
						children: value,
						props: dataOnCell,
						__style__: dataOnCell?.style
							? {
									...dataOnCell?.style,
									background: dataOnCell?.style?.background.substring(1),
								}
							: {},
					};
				};
			}

			if (item.type === TYPE_COMPONENT.DATE)
				render = (value: string) => ({
					children: dayjs(value).format(DATE_FORMAT),
				});

			if (item.type === TYPE_COMPONENT.NUMBER_ORDER)
				render = (value: number) => ({
					children: +value + 1,
				});

			if (item.type === TYPE_COMPONENT.TAG)
				render = (value: { label: string }) => ({
					children: value?.label,
				});

			return {
				...newItem,
				render,
			};
		});
	};

	return getColumn;
};
