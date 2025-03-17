import React, { useMemo, useRef, useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import dayjs from "dayjs";
import { Pagination, Spin, Tag, Button } from "antd";
import { uniq } from "lodash";

// Components
import Actions from "./Actions";

// Styles
import { WrapperTable } from "./styled";

// Utils
import { DATE_FORMAT, DATE_REQUEST } from "@/utility/constants";
import { TYPE_COMPONENT, ACTION_ENUM, COLUMN_SIZING } from "@/utility/enum";
import { formatNumber } from "@/utility";

// Constants
import {
	AG_GRID_LOCALE_VI,
	pageSizeOptions,
	paginationPageSize,
	initColDef,
} from "./constants";

//types
import { GridTableProps } from "./types";

//functional
import { changeToColumnGrid, sortAndFilter, onExportExcel } from "./functional";

const GridTable: React.FC<GridTableProps> = ({
	rowData,
	columns,
	loading,
	dateObj,
	rowBuffer,
	rowActions,
	pagination,
	isInfinite,
	onGridReady,
	onFilterChange,
	customRender,
	columnFilter,
	cacheBlockSize,
	maxBlocksInCache,
	defaultPagination,
	cacheOverflowSize,
	needConvertColumns,
	infiniteInitialRowCount,
	maxConcurrentDatasourceRequests,
	rowClassRules,
	showExport = false,
	isAutoSizeAll = false,
	autoHeaderHeight = false,
	defaultColDef = initColDef,
	nameExcel = "VĨNH TÂN FARM",
	columnSizing = COLUMN_SIZING.AUTO_SIZE_ALL,
	gridStyle = { width: "100%", height: "100%" },
	containerStyle = { width: "100%", height: "100%" },
	pinnedTopRowData = [],
	pinnedBottomRowData = [],
}) => {
	const divRef = useRef<HTMLDivElement | null>(null);
	const gridRef = useRef<any>(null);

	const [dataFilter, setDataFilter] = useState<any>([]);

	useEffect(() => {
		setDataFilter(rowData);
	}, [rowData]);

	const columnsTable = useMemo(() => {
		let newColumns = [...columns];
		if (needConvertColumns) {
			newColumns = changeToColumnGrid(newColumns);
		}
		function treeListFormatter(pathKey: string, level: number) {
			if (level === 1) {
				const date = new Date();
				date.setMonth(Number(pathKey) - 1);
				return date.toLocaleDateString(undefined, { month: "numeric" });
			}
			return pathKey || "";
		}
		const renderColumn = (columns: any) => {
			if (!columns?.length) {
				return [];
			}

			const arrActions: string[] = [];
			Object.keys(rowActions || {}).forEach((key) => {
				if (rowActions[key]) {
					arrActions.push(key);
				}
			});

			const onclickAction = (type: string, rowData: any) => {
				rowActions[type](rowData);
			};

			return columns.map((item: any, index: number) => {
				let children;
				if (item?.children) {
					children = renderColumn(item?.children);
				}

				let cellRenderer;
				let cellDataType;

				switch (item.type) {
					case TYPE_COMPONENT.NUMBER_ORDER:
						cellRenderer = ({ rowIndex }: { rowIndex: number }) => {
							return rowIndex + 1;
						};
						break;
					case TYPE_COMPONENT.LINK:
						cellRenderer = (params: any) => {
							return (
								<div
									style={{
										cursor: "pointer",
										color: "#1677ff",
										textDecorationLine: "underline",
									}}
									onClick={() =>
										rowActions?.[ACTION_ENUM.NAVIGATE]?.(params.data)
									}
								>
									{params.value}
								</div>
							);
						};
						break;

					case TYPE_COMPONENT.ACTIONS:
						cellRenderer = (params: any) => (
							<Actions
								types={arrActions}
								onClick={(type) => onclickAction(type, params.data)}
							/>
						);
						break;
					case TYPE_COMPONENT.CUSTOM:
						cellRenderer = (params: any) => (
							<>{customRender?.[item?.field!]?.(params?.data) || null}</>
						);
						break;

					case TYPE_COMPONENT.DATE:
						cellRenderer = ({ value }: any) =>
							value ? dayjs(value).format(DATE_FORMAT) : "";
						break;
					case TYPE_COMPONENT.TAG:
						cellRenderer = ({ value }: any) => (
							<Tag color={value?.color} style={{ color: value?.textColor }}>
								{value?.label}
							</Tag>
						);
						break;
					case TYPE_COMPONENT.NUMBER:
						cellRenderer = ({ value }: any) =>
							value !== undefined &&
							value !== null &&
							formatNumber(parseFloat(value));
						break;
					default:
						break;
				}

				if (loading && index === 0) {
					cellRenderer = () => <Spin />;
				}

				const filterCol = () => {
					if (columnFilter?.[item.field]) {
						if (item.type === TYPE_COMPONENT.DATE) {
							const newColumnFilter: string[] =
								columnFilter[item.field].map((item: any) => {
									return dayjs(item).format(DATE_FORMAT);
								}) || [];
							return { values: newColumnFilter };
						}
						return { values: columnFilter[item.field] };
					}

					return;
				};

				const { type, ...rest } = item;

				return {
					...rest,
					filter: columnFilter?.[item.field] ? item.filter : null,
					filterParams: {
						...item.filterParams,
						...filterCol(),
						treeListFormatter: treeListFormatter,
					},
					children,
					cellRenderer,
					cellDataType,
				};
			});
		};

		return renderColumn(newColumns);
	}, [columns, columnFilter, loading]);

	const dataTypeDefinitions: any = useMemo(() => {
		return {
			[TYPE_COMPONENT.DATE]: {
				baseDataType: "dateString",
				extendsDataType: "dateString",
				// valueParser: (params) => (params.value ? dayjs(params.value).format(DATE_FORMAT) : ''),
				valueFormatter: (params: any) =>
					params.value ? dayjs(params.value).format(DATE_REQUEST) : "",
			},
		};
	}, []);

	const onHandleGridReady = (param: any) => {
		const width: number = divRef?.current?.clientWidth || 0;

		onGridReady?.(param);

		const { bodyWidth = 0 } = param?.api?.columnModel;
		const { leftWidth = 0 } = param?.api?.columnModel;
		const { rightWidth = 0 } = param?.api?.columnModel;

		param.columnApi.autoSizeAllColumns(false);
		if (!(width < bodyWidth + leftWidth + rightWidth + 2)) {
			param.api.sizeColumnsToFit();
		} else {
			param.columnApi.autoSizeAllColumns(false);
		}
	};

	const onBodyScroll = (event: any) => {
		event.columnApi.autoSizeAllColumns(false);
	};

	const renderPageOption = () => {
		const total = pagination?.total || rowData?.length || 0;

		const newPageOption: number[] = [];
		if (total) {
			for (let i = 0; i < pageSizeOptions.length; i++) {
				if (total > pageSizeOptions[i]) {
					newPageOption.push(pageSizeOptions[i]);

					if (i === pageSizeOptions.length - 1) {
						newPageOption.push(total);
						break;
					}
				} else {
					newPageOption.push(total);
					break;
				}
			}
		}

		return uniq(newPageOption);
	};

	const dataSource = useMemo(
		() => ({
			getRows: (params: any) => {
				if (loading) {
					params.successCallback([], 1);
					return;
				}

				const columnField: any = columns;

				//GET TYPE OF SORT COLUMN
				const sortColumn: any = columnField?.find(
					(item: any) => item?.field === params.sortModel[0]?.colId
				);
				const sortColumnType = sortColumn?.type;

				//GET TYPE OF FILTER COLUMN
				const filterColumn: any = columnField?.find((item: any) =>
					Object.keys(params.filterModel).includes(item?.field)
				);
				const isFilterDateType = filterColumn?.type === TYPE_COMPONENT.DATE;

				const dataAfterSortingAndFiltering =
					sortAndFilter(
						rowData || [],
						params.sortModel,
						params.filterModel,
						sortColumnType,
						isFilterDateType,
						columnFilter
					) || rowData;

				onFilterChange?.(dataAfterSortingAndFiltering);
				setDataFilter(dataAfterSortingAndFiltering);

				const rowsThisPage = dataAfterSortingAndFiltering?.slice(
					params.startRow,
					params.endRow
				);
				let lastRow = -1;
				if (
					dataAfterSortingAndFiltering &&
					dataAfterSortingAndFiltering.length <= params.endRow
				) {
					lastRow = dataAfterSortingAndFiltering.length;
				}

				params.successCallback(rowsThisPage, lastRow);
				if (isAutoSizeAll && gridRef.current) {
					gridRef.current.api.sizeColumnsToFit();
				}
			},
		}),
		[rowData, loading, columnFilter, columns]
	);

	const showInfinite: any = () => {
		if (!isInfinite) {
			return {
				domLayout: "autoHeight",
				rowData: rowData,
				onGridReady: onHandleGridReady,
				onFirstDataRendered: onHandleGridReady,
				onBodyScroll: onBodyScroll,
			};
		}
		return {
			datasource: dataSource,
			rowModelType: "infinite",
			rowBuffer: rowBuffer,
			cacheBlockSize: cacheBlockSize,
			cacheOverflowSize: cacheOverflowSize,
			maxConcurrentDatasourceRequests: maxConcurrentDatasourceRequests,
			infiniteInitialRowCount: infiniteInitialRowCount,
			maxBlocksInCache: maxBlocksInCache,
		};
	};

	return (
		<>
			{showExport && (
				<Button
					loading={loading}
					type="primary"
					style={{
						marginTop: "-38px",
						float: "right",
					}}
					onClick={() =>
						onExportExcel(columnsTable, dataFilter, nameExcel!, dateObj)
					}
				>
					Xuất Excel
				</Button>
			)}
			<WrapperTable
				style={
					isInfinite ? { height: "58vh", ...containerStyle } : containerStyle
				}
			>
				<div ref={divRef} style={gridStyle} className="ag-theme-quartz">
					<AgGridReact
						ref={gridRef}
						columnDefs={columnsTable}
						defaultColDef={{
							...defaultColDef,
							autoHeaderHeight,
						}}
						dataTypeDefinitions={dataTypeDefinitions}
						localeText={AG_GRID_LOCALE_VI}
						suppressMenuHide={true}
						paginationPageSizeSelector={renderPageOption()}
						paginationPageSize={paginationPageSize}
						pagination={defaultPagination}
						suppressPropertyNamesCheck={true}
						rowClassRules={rowClassRules}
						pinnedTopRowData={pinnedTopRowData}
						pinnedBottomRowData={pinnedBottomRowData}
						{...showInfinite()}
					/>
				</div>
			</WrapperTable>
			{pagination && (
				<Pagination
					size="small"
					style={{
						margin: "16px 0",
						justifyContent: "flex-end",
						display: "flex",
					}}
					showTotal={(total, range) => {
						return `Bảng ghi từ ${range[0]} đến ${range[1]} trên ${total} kết quả`;
					}}
					{...pagination}
					pageSizeOptions={renderPageOption()}
				/>
			)}
		</>
	);
};

export default GridTable;
