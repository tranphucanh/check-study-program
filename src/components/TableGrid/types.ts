import { CSSProperties } from 'react'
import { ColDef, ColGroupDef, RowClassRules } from 'ag-grid-community'
import { PaginationProps } from 'antd'

// Models
import { IColumn } from '@/models'

//utility
import { COLUMN_SIZING } from '@/utility/enum'

export interface GridTableProps {
	rowData: any[] 
	containerStyle?: CSSProperties
	gridStyle?: CSSProperties
	columns: Array<ColDef<any, any>> | Array<ColGroupDef<any>> | IColumn[]
	defaultColDef?: ColDef
	onGridReady?: (params: any) => void
	pagination?: PaginationProps
	rowActions?: any
	customRender?: {
		[key: string]: any
	}
	columnSizing?: COLUMN_SIZING
	autoHeaderHeight?: boolean
	defaultPagination?: boolean
	isInfinite?: boolean
	rowBuffer?: number
	cacheBlockSize?: number
	cacheOverflowSize?: number
	maxConcurrentDatasourceRequests?: number
	infiniteInitialRowCount?: number
	maxBlocksInCache?: number
	columnFilter?: any
	loading?: boolean
	showExport?: boolean
	nameExcel?: string
	needConvertColumns?: boolean
	isAutoSizeAll?: boolean
	dateObj?: { date?: string; startDate?: string; endDate?: string }
	rowClassRules?: RowClassRules
	pinnedTopRowData?: any[]
	pinnedBottomRowData?: any[]
	onFilterChange?: (value: any[]) => void
}
