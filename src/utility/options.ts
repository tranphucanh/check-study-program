import {
	ACCOUNT_TYPE,
	ORDER_STATUS,
	ORDER_TYPE,
	PAYMENT_METHOD,
	PIG_TYPE,
	PRODUCT_GROUP_TYPE,
	PRODUCT_SCOPE,
	TRANSACTION_TYPE,
	WAREHOUSE_TYPE,
} from "./enum";
import {
	accountTypeLabel,
	labelProductScope,
	labelWarehouseType,
	orderStatusLabel,
	paymentMethodLabel,
	pigTypeLabel,
	priceTypeLabel,
	productGrTypeLabel,
	transactionTypeLabel,
} from "./label";

export const optionProductScope = [
	{
		value: PRODUCT_SCOPE.EXTERNAL,
		label: labelProductScope[PRODUCT_SCOPE.EXTERNAL],
	},
	{
		value: PRODUCT_SCOPE.INTERNAL,
		label: labelProductScope[PRODUCT_SCOPE.INTERNAL],
	},
];

export const optionWarehouseType = [
	{
		value: WAREHOUSE_TYPE.KHO_HEO_HOI,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_HEO_HOI],
	},
	{
		value: WAREHOUSE_TYPE.KHO_MANH,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_MANH],
	},
	{
		value: WAREHOUSE_TYPE.KHO_BAN_THANH_PHAM,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_BAN_THANH_PHAM],
	},
	{
		value: WAREHOUSE_TYPE.KHO_THANH_PHAM,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_THANH_PHAM],
	},
	{
		value: WAREHOUSE_TYPE.KHO_XUAT_BAN,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_XUAT_BAN],
	},
	{
		value: WAREHOUSE_TYPE.KHO_DAU_LONG,
		label: labelWarehouseType[WAREHOUSE_TYPE.KHO_DAU_LONG],
	},
];

export const optionOrderStatus = [
	{
		value: ORDER_STATUS.PENDING,
		label: orderStatusLabel[ORDER_STATUS.PENDING],
	},
	{
		value: ORDER_STATUS.DELETED,
		label: orderStatusLabel[ORDER_STATUS.DELETED],
	},
	{
		value: ORDER_STATUS.PROBLEM_SOLVING,
		label: orderStatusLabel[ORDER_STATUS.PROBLEM_SOLVING],
	},
	{
		value: ORDER_STATUS.BILLING,
		label: orderStatusLabel[ORDER_STATUS.BILLING],
	},
	{
		value: ORDER_STATUS.COMPLETED,
		label: orderStatusLabel[ORDER_STATUS.COMPLETED],
	},
	{
		value: ORDER_STATUS.DELETED,
		label: orderStatusLabel[ORDER_STATUS.DELETED],
	},
];

export const optionProductGrType = [
	{
		value: PRODUCT_GROUP_TYPE.HT,
		label: productGrTypeLabel[PRODUCT_GROUP_TYPE.HT],
	},
	{
		value: PRODUCT_GROUP_TYPE.CULL,
		label: productGrTypeLabel[PRODUCT_GROUP_TYPE.CULL],
	},
	{
		value: PRODUCT_GROUP_TYPE.PIGLET,
		label: productGrTypeLabel[PRODUCT_GROUP_TYPE.PIGLET],
	},
	{
		value: PRODUCT_GROUP_TYPE.GILT,
		label: productGrTypeLabel[PRODUCT_GROUP_TYPE.GILT],
	},
];

export const paymentMethodOption = [
	{
		value: PAYMENT_METHOD.CASH,
		label: paymentMethodLabel[PAYMENT_METHOD.CASH],
	},
	{
		value: PAYMENT_METHOD.BANK_TRANSFER,
		label: paymentMethodLabel[PAYMENT_METHOD.TRANSFER],
	},
];

export const pigTypeOption = [
	{
		value: PIG_TYPE.CHINH_PHAM,
		label: pigTypeLabel[PIG_TYPE.CHINH_PHAM],
	},
	{
		value: PIG_TYPE.THU_PHAM_1,
		label: pigTypeLabel[PIG_TYPE.THU_PHAM_1],
	},
	{
		value: PIG_TYPE.THU_PHAM_2,
		label: pigTypeLabel[PIG_TYPE.THU_PHAM_2],
	},
];

export const pigTypeIdOption = [
	{
		value: 1,
		label: pigTypeLabel[PIG_TYPE.CHINH_PHAM],
	},
	{
		value: 2,
		label: pigTypeLabel[PIG_TYPE.THU_PHAM_1],
	},
	{
		value: 3,
		label: pigTypeLabel[PIG_TYPE.THU_PHAM_2],
	},
];

export const priceTypeOption = [
	{
		value: ORDER_TYPE.HT,
		label: priceTypeLabel[ORDER_TYPE.HT],
	},
	{
		value: ORDER_TYPE.PIGLET,
		label: priceTypeLabel[ORDER_TYPE.PIGLET],
	},
	{
		value: ORDER_TYPE.CULL,
		label: priceTypeLabel[ORDER_TYPE.CULL],
	},
	{
		value: ORDER_TYPE.GILT,
		label: priceTypeLabel[ORDER_TYPE.GILT],
	},
];

export const accountTypeOption = [
	{
		value: ACCOUNT_TYPE.COMPANY,
		label: accountTypeLabel[ACCOUNT_TYPE.COMPANY],
	},
	{
		value: ACCOUNT_TYPE.INDIVIDUAL,
		label: accountTypeLabel[ACCOUNT_TYPE.INDIVIDUAL],
	},
];

export const transactionTypeOption = [
	{
		value: TRANSACTION_TYPE.DEPOSIT,
		label: transactionTypeLabel[TRANSACTION_TYPE.DEPOSIT],
	},
	{
		value: TRANSACTION_TYPE.WITHDRAW,
		label: transactionTypeLabel[TRANSACTION_TYPE.WITHDRAW],
	},
];
