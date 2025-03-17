import { ACTION_ENUM } from '@/utility/enum'

export const labelAction: any = {
	[ACTION_ENUM.EDIT]: 'Chỉnh sửa',
	[ACTION_ENUM.DELETE]: 'Xoá',
	[ACTION_ENUM.MORE]: 'Xem thêm',
}

export const AG_GRID_LOCALE_VI = {
	ariaPageSizeSelectorLabel: 'Kích thước trang',
	noRowsToShow: 'Dữ liệu rỗng',
	searchOoo: 'Tìm kiếm...',
	selectAll: '(Tất cả)',
	pinColumn: 'Ghim cột',
	pinLeft: 'Ghim bên trái',
	pinRight: 'Ghim bên phải',
	noPin: 'Không ghim',
	autosizeThiscolumn: 'Tự động kích thước cột này',
	autosizeAllColumns: 'Tự động kích thước tất cả cột',
	resetColumns: 'Khôi phục cột',
	pageSizeSelectorLabel: 'Kích thước trang:',
	to: 'Đến',
	of: 'Trên',
	page: 'Trang',
	nextPage: 'Trang kế',
	lastPage: 'Trang cuối',
	firstPage: 'Trang đầu',
	previousPage: 'Trang trước',
}

export const paginationPageSize = 10

export const pageSizeOptions = [10, 20, 50, 100]

export const initColDef = {
	resizable: true,
	cellDataType: false,
	wrapHeaderText: true,
	autoHeaderHeight: false,
}
