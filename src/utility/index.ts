import Cookies from "js-cookie";
import { Modal } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { NotifyEnums, TYPE_COMPONENT } from "./enum";
import { TOKEN_KEY, EXPIRES, DATE_FORMAT } from "./constants";
import weekOfYear from "dayjs/plugin/weekOfYear";
import isoWeek from "dayjs/plugin/isoWeek";
import customParseFormat from "dayjs/plugin/customParseFormat";
import _ from "lodash";

dayjs.extend(weekOfYear);
dayjs.extend(isoWeek);
dayjs.extend(customParseFormat);

export const isServer = typeof window !== "undefined";

export const getCookie = (key: string) => (isServer ? Cookies.get(key) : null);

export const setCookie = (key: string, token: any, expires?: number) => {
	return isServer && token ? Cookies.set(key, token, { expires }) : null;
};

export const deleteCookie = (key: string) => Cookies.remove(key);

export const deleteAllCookie = () => {
	const cookies = Cookies.get();

	for (const cookie in cookies) {
		Cookies.remove(cookie);
	}
};

export const notifyModal = (type: NotifyEnums, content: string) => {
	if (content && type) {
		return Modal[type]({ content });
	}
};

export const setAuthToken = (token: string, remember?: boolean) => {
	const expires = remember ? EXPIRES : undefined;
	Cookies.set(TOKEN_KEY, token, { expires, path: "/", secure: true });
};

export const formatDate = (
	date: string | Date | Dayjs,
	format = DATE_FORMAT
) => {
	if (!date) {
		return date;
	}
	return dayjs(date).format(format);
};

export const formatCurrency = (number: number = 0) => {
	if (+number && typeof +number === "number") {
		return `${Number(+number.toFixed(2)).toLocaleString()}đ`;
	}

	return "0 đ";
};

export const formatNumber = (number: number = 0) => {
	if (+number && typeof +number === "number") {
		return Number((+number).toFixed(2)).toLocaleString();
	}

	return number;
};

export const changeKeyInTree = (data, type = "label") => {
	return data.map((node) => {
		const { id = node?.key, name, ...rest } = node;

		const newNode = { key: id, [type]: name, ...rest };

		if (node.children && node.children.length > 0) {
			newNode.children = changeKeyInTree(node.children, node?.typeFormat);
		}

		return newNode;
	});
};

export const groupDataByKey = (data, arrKey, typeObj?: any) => {
	const result = {};

	data.forEach((item) => {
		arrKey.forEach((key) => {
			if (!result?.[key]?.length) {
				result[key] = [
					{
						text:
							typeObj?.[key] === TYPE_COMPONENT.DATE
								? formatDate(item[key])
								: item[key],
						value: item[key],
					},
				];
			} else if (!result[key].find((d) => d.value === item[key])) {
				result[key].push({
					text:
						typeObj?.[key] === TYPE_COMPONENT.DATE
							? formatDate(item[key])
							: item[key],
					value: item[key],
				});
			}
		});
	});

	return result;
};

export const getSearchParams = (searchParams: URLSearchParams) => {
	const params: Record<string, any> = {};

	searchParams.forEach((value, key) => {
		if (value) {
			const numericValue = parseFloat(value);
			if (!isNaN(numericValue)) {
				// If it's a valid number, store it as a number
				params[key] = numericValue;
			} else if (value === "undefined") {
				params[key] = undefined;
			} else {
				// If not a valid number, store it as a string
				params[key] = value;
			}
		}
	});
	return { ...params };
};

export const removeAccents = (str) => {
	const string = str
		.normalize("NFD")
		.replace(/[\u0300-\u036f]/g, "")
		.replace(/đ/g, "d")
		.replace(/Đ/g, "D");
	return string.replace(/\s/g, "_");
};

export const genSchema = (arr: any[]) => {
	return arr?.map((item) => ({
		column: item.title,
		type: item?.valueType || String,
		width: item?.widthExcel || 15,
		alignVertical: "center",
		align: "center",
		wrap: true,
		value: (d) => {
			return item?.valueType === Date
				? dayjs(d?.[item.key] || "").toDate()
				: d?.[item.key] || "";
		},
	}));
};

export const createNumberArray = (n: number) => {
	return Array.from({ length: n }, (_, index) => index + 1);
};

export const formatCurrencyUnit = (number: number = 0) => {
	if (number >= 1000000 && number < 1000000000)
		return `${number / 1000000} triệu`;
	if (number >= 1000000000) return `${number / 1000000000} tỷ`;
	return formatNumber(number);
};
