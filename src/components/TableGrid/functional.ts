//libs
import dayjs from 'dayjs'
import { Excel } from 'antd-table-saveas-excel'

// Hooks
import { useColumn } from '@/hooks'

// Models
import { IColumn } from '@/models'
import { ColumnMenuTab } from 'ag-grid-community'

//types
import { GridTableProps } from './types'

//utils
import { TYPE_COMPONENT } from '@/utility/enum'
import { DATE_FORMAT } from '@/utility/constants'
import { formatDate } from '@/utility'

const columnMenuTab: ColumnMenuTab[] = ['filterMenuTab']

const paramColumn = {
	filter: 'agSetColumnFilter',
	filterParams: {
		treeList: true,
	},
	sortable: true,
}

const column = useColumn()

export const changeToColumnGrid = (columns: any) => {
	if (!columns?.length) {
		return []
	}

	return columns.map((item: IColumn) => {
		if (item?.children) {
			return {
				...item,
				field: item?.key || item?.field,
				headerName: item?.title,
				width: item?.width ? item.width + 50 : 150,
				menuTabs: columnMenuTab,
				...paramColumn,
				children: changeToColumnGrid(item?.children),
			}
		}
		return {
			...item,
			key: item?.keyExport || item?.key,
			field: item?.key || item?.field,
			headerName: item?.title,
			width: item?.width ? item.width + 50 : 150,
			menuTabs: columnMenuTab,
			...paramColumn,
		}
	})
}

export const sortAndFilter = (
	allOfTheData: GridTableProps['rowData'],
	sortModel: any,
	filterModel: any,
	sortColumnType = TYPE_COMPONENT.TEXT,
	isFilterDateType = false,
	columnFilter?: any
) => {
	return sortData(sortModel, filterData(filterModel, allOfTheData, isFilterDateType, columnFilter), sortColumnType)
}

const sortData = (sortModel: any, data: GridTableProps['rowData'], sortColumnType: string) => {
	const sortPresent = sortModel && sortModel.length > 0
	if (!sortPresent) {
		return data
	}
	// do an in memory sort of the data, across all the fields
	const resultOfSort = data.slice()
	resultOfSort.sort(function (a: any, b: any) {
		for (let k = 0; k < sortModel.length; k++) {
			const sortColModel = sortModel[k]

			let valueA: string | number
			let valueB: string | number

			switch (sortColumnType) {
				case TYPE_COMPONENT.DATE:
					valueA = dayjs(a[sortColModel.colId]).valueOf()
					valueB = dayjs(b[sortColModel.colId]).valueOf()
					break
				case TYPE_COMPONENT.NUMBER:
					valueA = parseInt(a[sortColModel.colId])
					valueB = parseInt(b[sortColModel.colId])
					break
				case TYPE_COMPONENT.TAG:
					valueA = a[sortColModel.colId].label
					valueB = b[sortColModel.colId].label
					break
				default:
					valueA = a[sortColModel.colId]
					valueB = b[sortColModel.colId]
					break
			}

			if (dayjs(a[sortColModel.colId], DATE_FORMAT).isValid()) {
				valueA = dayjs(a[sortColModel.colId], DATE_FORMAT).valueOf()
			}

			if (dayjs(b[sortColModel.colId], DATE_FORMAT).isValid()) {
				valueB = dayjs(b[sortColModel.colId], DATE_FORMAT).valueOf()
			}

			// this filter didn't find a difference, move onto the next one
			if (valueA == valueB) {
				continue
			}
			const sortDirection = sortColModel.sort === 'asc' ? 1 : -1
			if (valueA > valueB) {
				return sortDirection
			} else {
				return sortDirection * -1
			}
		}
		// no filters found a difference
		return 0
	})
	return resultOfSort
}

const filterData = (filterModel: any, data: GridTableProps['rowData'], isFilterDateType: boolean, columnFilter: any) => {
	const filterPresent = filterModel && Object.keys(filterModel).length > 0
	if (!filterPresent && !columnFilter) {
		return data
	}
	const resultOfFilter: any[] = []
	for (let i = 0; i < data.length; i++) {
		const item: any = data[i]

		let isCheck = true
		Object.keys(columnFilter).forEach((key) => {
			if (filterModel?.[key]) {
				let valueFilter = filterModel[key]?.values
				if (typeof item?.[key] === 'number') {
					valueFilter = valueFilter?.map((item: string) => parseFloat(item))
				}

				if (
					valueFilter.findIndex((d: any) => d === (typeof item?.[key] === 'object' ? item?.[key]?.label?.toString() : item?.[key])) < 0
				) {
					isCheck = false
				}

				// filter date
				if (isFilterDateType) {
					valueFilter?.forEach((value: any) => {
						if (dayjs(item?.[key]).format(DATE_FORMAT) === value) {
							isCheck = true
						}
					})
				}
			}
		})

		if (isCheck) {
			resultOfFilter.push(item)
		}
	}

	return resultOfFilter
}

const renderDateExport = (dateObj: GridTableProps['dateObj']) => {
	if (dateObj?.startDate && dateObj.endDate) {
		return `Từ: ${formatDate(dateObj.startDate)} - Đến: ${formatDate(dateObj.endDate)}`
	}
	return `Ngày: ${dateObj?.date}`
}

export const onExportExcel = (columnsTable: any, dataFilter: any, nameExcel: string, dateObj?: GridTableProps['dateObj']) => {
	const excel = new Excel()

	const columnTable = column(columnsTable)

	const getNumberCol = (dataCol: any) => {
		let numberCol = 0

		dataCol?.forEach((item: any) => {
			if (item?.children?.length) {
				numberCol += getNumberCol(item?.children)
			} else {
				numberCol += 1
			}
		})

		return numberCol
	}

	const countCol = getNumberCol(columnsTable) || 1

	excel
		.setTHeadStyle({
			background: '92d050',
			borderColor: '000',
			h: 'center',
			wrapText: true,
		})
		.setTBodyStyle({
			border: true,
			h: 'center',
		})
		.addSheet('Sheet1')
		.drawCell(0, 0, { value: nameExcel, hMerge: countCol - 1, style: { h: 'center', fontSize: 20, bold: true } })

	if (dateObj) {
		excel.drawCell(0, 1, { value: renderDateExport(dateObj), hMerge: countCol - 1, style: { h: 'center', fontSize: 14, bold: true } })
	}

	excel
		.addColumns(columnTable)
		.addDataSource(dataFilter, {
			str2Percent: true,
		})
		.saveAs(`${nameExcel}.xlsx` || '')
	excel.addRow()
}
