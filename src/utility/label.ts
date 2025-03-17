import {
	ACCOUNT_TYPE,
	BILL_STATUS,
	ORDER_STATUS,
	ORDER_TYPE,
	PAYMENT_METHOD,
	PIG_TYPE,
	PRODUCT_GROUP_TYPE,
	PRODUCT_SCOPE,
	STATUS,
	TRANSACTION_TYPE,
	WAREHOUSE_TYPE,
} from "./enum";

export const labelProductScope = {
	[PRODUCT_SCOPE.EXTERNAL]: "Bên ngoài",
	[PRODUCT_SCOPE.INTERNAL]: "Nội bộ",
};

export const labelWarehouseType = {
	[WAREHOUSE_TYPE.KHO_HEO_HOI]: "Kho heo hơi",
	[WAREHOUSE_TYPE.KHO_MANH]: "Kho mảnh",
	[WAREHOUSE_TYPE.KHO_BAN_THANH_PHAM]: "Kho bán thành phẩm",
	[WAREHOUSE_TYPE.KHO_THANH_PHAM]: "Kho thành phẩm",
	[WAREHOUSE_TYPE.KHO_XUAT_BAN]: "Kho xuất bán",
	[WAREHOUSE_TYPE.KHO_DAU_LONG]: "Kho đầu lòng",
};

export const statusColor = {
	[ORDER_STATUS.PENDING]: "processing",
	[ORDER_STATUS.PREPARE_ORDER]: "processing",
	[ORDER_STATUS.PROBLEM_SOLVING]: "processing",
	[ORDER_STATUS.BILLING]: "processing",
	[ORDER_STATUS.COMPLETED]: "success",
	[ORDER_STATUS.DELETED]: "error",
	[BILL_STATUS.APPROVED]: "success",
	[BILL_STATUS.REJECTED]: "error",
};

export const orderStatusLabel = {
	[ORDER_STATUS.PENDING]: "Đã tạo",
	[ORDER_STATUS.PREPARE_ORDER]: "Trại chuẩn bị giao heo",
	[ORDER_STATUS.PROBLEM_SOLVING]: "Xử lý biên bản vấn đề",
	[ORDER_STATUS.BILLING]: "Hóa đơn",
	[ORDER_STATUS.COMPLETED]: "Hoàn thành",
	[ORDER_STATUS.DELETED]: "Đã hủy",
};

export const orderStatusTag = {
	[ORDER_STATUS.PENDING]: {
		color: statusColor[ORDER_STATUS.PENDING],
		label: orderStatusLabel[ORDER_STATUS.PENDING],
	},
	[ORDER_STATUS.PREPARE_ORDER]: {
		color: statusColor[ORDER_STATUS.PREPARE_ORDER],
		label: orderStatusLabel[ORDER_STATUS.PREPARE_ORDER],
	},
	[ORDER_STATUS.PROBLEM_SOLVING]: {
		color: statusColor[ORDER_STATUS.PROBLEM_SOLVING],
		label: orderStatusLabel[ORDER_STATUS.PROBLEM_SOLVING],
	},
	[ORDER_STATUS.BILLING]: {
		color: statusColor[ORDER_STATUS.BILLING],
		label: orderStatusLabel[ORDER_STATUS.BILLING],
	},
	[ORDER_STATUS.COMPLETED]: {
		color: statusColor[ORDER_STATUS.COMPLETED],
		label: orderStatusLabel[ORDER_STATUS.COMPLETED],
	},
	[ORDER_STATUS.DELETED]: {
		color: statusColor[ORDER_STATUS.DELETED],
		label: orderStatusLabel[ORDER_STATUS.DELETED],
	},
};

export const productGrTypeLabel = {
	[PRODUCT_GROUP_TYPE.HT]: "Heo thịt",
	[PRODUCT_GROUP_TYPE.CULL]: "Heo loại",
	[PRODUCT_GROUP_TYPE.PIGLET]: "Heo con",
	[PRODUCT_GROUP_TYPE.GILT]: "Heo hậu bị",
};

export const paymentMethodLabel = {
	[PAYMENT_METHOD.CASH]: "Tiền mặt",
	[PAYMENT_METHOD.TRANSFER]: "Chuyển khoản",
	[PAYMENT_METHOD.BANK_TRANSFER]: "Chuyển khoản",
	[PAYMENT_METHOD.CREDIT]: "Tín dụng",
};

export const statusLabel = {
	[STATUS.PENDING]: "Chờ duyệt",
	[STATUS.ERROR]: "Lỗi",
	[STATUS.COMPLETED]: "Hoàn thành",
	[STATUS.DELETED]: "Đã hủy",
	[STATUS.APPROVED]: "Đã duyệt",
	[STATUS.CREATED]: "Đã tạo",
	[STATUS.REJECTED]: "Từ chối",
};

export const statusTag = {
	[STATUS.COMPLETED]: {
		color: statusColor[STATUS.COMPLETED],
		label: statusLabel[STATUS.COMPLETED],
	},
	[STATUS.ERROR]: {
		color: statusColor[STATUS.ERROR],
		label: statusLabel[STATUS.ERROR],
	},
	[STATUS.PENDING]: {
		color: statusColor[STATUS.PENDING],
		label: statusLabel[STATUS.PENDING],
	},
	[STATUS.WAITING]: {
		color: statusColor[STATUS.PENDING],
		label: statusLabel[STATUS.PENDING],
	},
	[STATUS.APPROVED]: {
		color: statusColor[STATUS.COMPLETED],
		label: statusLabel[STATUS.APPROVED],
	},
	[STATUS.DELETED]: {
		color: statusColor[STATUS.DELETED],
		label: statusLabel[STATUS.DELETED],
	},
	[STATUS.CREATED]: {
		color: statusColor[STATUS.PENDING],
		label: statusLabel[STATUS.CREATED],
	},
	[STATUS.REJECTED]: {
		color: statusColor[STATUS.DELETED],
		label: statusLabel[STATUS.REJECTED],
	},
};

export const orderTypeLabel = {
	[ORDER_TYPE.HT]: "Đơn hàng heo thịt",
	[ORDER_TYPE.PIGLET]: "Đơn hàng heo con",
	[ORDER_TYPE.CULL]: "Đơn hàng heo loại",
	[ORDER_TYPE.GILT]: "Đơn hàng heo hậu bị",
};

export const pigTypeLabel = {
	[PIG_TYPE.CHINH_PHAM]: "Chính phẩm",
	[PIG_TYPE.THU_PHAM_1]: "Thứ phẩm loại 1",
	[PIG_TYPE.THU_PHAM_2]: "Thứ phẩm loại 2",
};

export const priceTypeLabel = {
	[ORDER_TYPE.HT]: "Báo giá heo thịt",
	[ORDER_TYPE.PIGLET]: "Báo giá heo con",
	[ORDER_TYPE.GILT]: "Báo giá heo hậu bị",
	[ORDER_TYPE.CULL]: "Báo giá heo loại",
};

export const labelTransferStatus = {
	WAITING_ORIGIN_FARM: "Chờ trại giao xử lí",
	WAITING_DESTINATION_FARM: "Chờ trại nhận xử lí",
	WAITING_SYSTEM_CHECK: "Chờ Kỹ thuật kiểm tra",
	WAITING_SYSTEM_VERIFY: "Chờ Quản lý duyệt",
	WAITING_UPDATE_HOUSE: "Chờ cập nhập khu (nhà) trại nhận",
	COMPLETED: "Hoàn thành",
	CANCELED: "Đã hủy",
	WAITING_TRANSFER_STATION: "Đang cân heo",
};

export const transferStatusTag = {
	WAITING_ORIGIN_FARM: {
		color: statusColor[BILL_STATUS.PENDING],
		label: labelTransferStatus["WAITING_ORIGIN_FARM"],
	},
	WAITING_SYSTEM_CHECK: {
		color: statusColor[BILL_STATUS.PENDING],
		label: labelTransferStatus["WAITING_SYSTEM_CHECK"],
	},
	COMPLETED: {
		color: statusColor[BILL_STATUS.APPROVED],
		label: labelTransferStatus["COMPLETED"],
	},
	CANCELED: {
		color: statusColor[BILL_STATUS.REJECTED],
		label: labelTransferStatus["CANCELED"],
	},
};

export const accountTypeLabel = {
	[ACCOUNT_TYPE.COMPANY]: "TK công ty",
	[ACCOUNT_TYPE.INDIVIDUAL]: "TK cá nhân",
};

export const transactionTypeLabel = {
	[TRANSACTION_TYPE.DEPOSIT]: "Nạp tiền",
	[TRANSACTION_TYPE.WITHDRAW]: "Rút tiền",
};

export const billStatusTag = {
	[BILL_STATUS.PENDING]: {
		color: statusColor[BILL_STATUS.PENDING],
		label: statusLabel[BILL_STATUS.PENDING],
	},
	[BILL_STATUS.APPROVED]: {
		color: statusColor[BILL_STATUS.APPROVED],
		label: statusLabel[BILL_STATUS.APPROVED],
	},
	[BILL_STATUS.REJECTED]: {
		color: statusColor[BILL_STATUS.REJECTED],
		label: statusLabel[BILL_STATUS.REJECTED],
	},
};
