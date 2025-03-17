// Libraries
import React, { useMemo, useRef } from "react";
import {
	Table,
	Checkbox,
	Tag,
	PaginationProps,
	Input,
	Space,
	Button,
	Typography,
} from "antd";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import type { ColumnType } from "antd/es/table";
import type { InputRef } from "antd";
import type { FilterConfirmProps } from "antd/es/table/interface";
import { uniq } from "lodash";

// Icons
import { SearchOutlined } from "@ant-design/icons";
import CopyIcon from "@assets/svg/copy.svg";

// Styles
import {
	StyledCell,
	StyledCheckedIcon,
	StyledIcon,
	StyledLink,
} from "./styled";

// Components
import Actions from "./Actions";

// Models
import { IColumn, IScroll } from "@/models";

// Utils
import { TYPE_COMPONENT, ACTION_ENUM } from "@/utility/enum";
import { formatCurrency, formatDate, formatNumber } from "@/utility";

export interface TableProps {
	columns?: IColumn[];
	dataSource?: any;
	rowActions?: any;
	rowKey?: string;
	expandable?: any;
	rowSelection?: any;
	tableLayout?: "auto" | "fixed";
	pagination?: PaginationProps;
	loading?: boolean;
	filtersData?: {
		[key: string]: any[];
	};
	bordered?: boolean;
	customRender?: {
		[key: string]: any;
	};
	scroll?: IScroll;
	showPagination?: boolean;
	summary?: (data) => React.ReactNode;
	sticky?:
		| boolean
		| {
				offsetHeader?: number;
				offsetScroll?: number;
				getContainer?: () => HTMLElement;
		  };
	rowClassName?: (row) => void;
	components?: any;
}

type Align = "left" | "right" | "center";

const SIZE_MAX = 10;

const pageSizeOptions = [10, 20, 50, 100];

const { Paragraph } = Typography;

const TableComp: React.FC<TableProps> = ({
	columns,
	dataSource,
	rowActions,
	rowKey = "key",
	expandable,
	tableLayout = "auto",
	rowSelection,
	pagination,
	loading,
	filtersData,
	bordered = false,
	customRender,
	scroll,
	showPagination = true,
	summary,
	sticky,
	rowClassName,
	components,
}) => {
	const searchInput = useRef<InputRef>(null);

	const getColumnSearchProps = (dataIndex, title): ColumnType<any> => ({
		filterDropdown: ({ setSelectedKeys, selectedKeys, confirm }) => (
			<div style={{ padding: 10 }} onKeyDown={(e) => e.stopPropagation()}>
				<Input
					ref={searchInput}
					placeholder={`Tìm kiếm ${title}`}
					value={setSelectedKeys[0]}
					onChange={(e) =>
						setSelectedKeys(e.target.value ? [e.target.value] : [])
					}
					onPressEnter={() =>
						handleSearch(selectedKeys as string[], confirm, dataIndex)
					}
					style={{ marginBottom: 8, display: "block" }}
				/>
				<Space>
					<Button
						type="primary"
						onClick={() =>
							handleSearch(selectedKeys as string[], confirm, dataIndex)
						}
						// icon={<SearchOutlined />}
						size="small"
						style={{ width: 100 }}
					>
						Tìm kiếm
					</Button>
				</Space>
			</div>
		),
		filterIcon: (filtered: boolean) => (
			<SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
		),
		onFilter: (value, record) => {
			return record[dataIndex]
				.toString()
				.toLowerCase()
				.includes((value as string).toLowerCase());
		},
		onFilterDropdownOpenChange: (visible) => {
			if (visible) {
				setTimeout(() => searchInput.current?.select(), 100);
			}
		},
	});

	const columnsTable = useMemo(() => {
		const renderColumn = (columns) => {
			if (columns && columns.length) {
				const arrActions: string[] = [];
				Object.keys(rowActions || {}).forEach((key) => {
					if (rowActions[key]) {
						arrActions.push(key);
					}
				});

				const onclickAction = (type: string, rowData: any) => {
					rowActions[type](rowData);
				};

				return columns.map((item: IColumn) => {
					let newItem: any = {
						...item,
						dataIndex: item.key,
					};

					if (item?.children) {
						newItem = {
							...newItem,
							children: renderColumn(item?.children),
						};
					}

					// const isDisabled = disabled?.length ? disabled.includes(item.key) : false
					let render: any = "";

					let align: Align = "center";

					let sorter;

					if (item?.search) {
						newItem = {
							...newItem,
							...getColumnSearchProps(item.key, item.title),
						};
					}

					if (item.sort) {
						const keySort =
							typeof item.sort === "boolean" ? item.key : item.sort;
						sorter = (a, b) => a?.[keySort]?.localeCompare?.(b?.[keySort]);
					}

					if (item.filter && filtersData?.[item.filter]) {
						newItem = {
							...newItem,
							filters: filtersData[item.filter],
							onFilter: getColumnSearchProps(item.filter, item.title).onFilter,
							//onFilterDropdownOpenChange: getColumnSearchProps
						};
					}

					switch (item.type) {
						case TYPE_COMPONENT.NUMBER_ORDER:
							render = (_: any, __: any, index) => {
								return index + 1;
							};
							break;
						case TYPE_COMPONENT.LINK:
							render = (cell: any, record: any) => {
								return (
									<div
										style={{
											cursor: "pointer",
											color: "#1677ff",
											textDecorationLine: "underline",
										}}
										onClick={() =>
											typeof cell !== "object"
												? rowActions?.[ACTION_ENUM.NAVIGATE]?.(record)
												: null
										}
									>
										{typeof cell !== "object" ? (
											<>{cell}</>
										) : (
											<Link to={cell?.navigate}>{cell?.text}</Link>
										)}
									</div>
								);
							};
							break;
						case TYPE_COMPONENT.CHECKBOX:
							render = (text: any) => {
								return <Checkbox defaultChecked={text} />;
							};
							align = "center";
							break;
						case TYPE_COMPONENT.BLOCK_CHECKBOX:
							render = (text: any) => {
								return <Checkbox disabled checked={text} />;
							};
							align = "center";
							break;
						case TYPE_COMPONENT.ACTIONS:
							render = (_: any, rowData: any) => (
								<Actions
									types={arrActions}
									onClick={(type) => onclickAction(type, rowData)}
									hideAction={rowData?.hideAction || []}
								/>
							);
							break;
						case TYPE_COMPONENT.TAG:
							render = (data: any) => {
								return (
									<Tag color={data?.color} style={{ color: data?.textColor }}>
										{data?.label}
									</Tag>
								);
							};
							break;
						case TYPE_COMPONENT.DATE:
							render = (text: any) => <>{formatDate(text)}</>;
							if (item.sort) {
								sorter = (a, b) =>
									dayjs(a[item.key])?.valueOf() - dayjs(b[item.key])?.valueOf();
							}
							break;
						case TYPE_COMPONENT.CURRENCY:
							render = (text: any) => <>{formatCurrency(text)}</>;
							align = "right";
							break;
						case TYPE_COMPONENT.NUMBER:
							render = (text: any) => <>{formatNumber(text)}</>;
							if (item.sort) {
								sorter = (a, b) => a[item.key] - b[item.key];
							}

							break;

						case TYPE_COMPONENT.CUSTOM:
							render = (_, rowData: any, index: number) => (
								<>{customRender?.[item.key]?.(rowData, index) || null}</>
							);
							break;

						case TYPE_COMPONENT.LINK_COPY:
							render = (cell: any, record: any) => {
								return (
									<StyledLink
										onClick={() =>
											typeof cell !== "object"
												? rowActions?.[ACTION_ENUM.NAVIGATE]?.(record)
												: null
										}
									>
										{typeof cell !== "object" ? (
											<Paragraph
												copyable={{
													icon: [
														<StyledIcon src={CopyIcon} />,
														<StyledCheckedIcon />,
													],
													tooltips: ["Sao chép", "Đã sao chép"],
												}}
											>
												{cell}
											</Paragraph>
										) : (
											<Link to={cell?.navigate}>
												<Paragraph
													copyable={{
														icon: [
															<StyledIcon src={CopyIcon} />,
															<StyledIcon src={CopyIcon} />,
														],
														tooltips: ["Sao chép", "Đã sao chép"],
													}}
												>
													{cell?.text}
												</Paragraph>
											</Link>
										)}
									</StyledLink>
								);
							};
							break;
						case TYPE_COMPONENT.TITLE_CELL:
							render = (text: any) => <StyledCell>{text}</StyledCell>;
							break;
						case TYPE_COMPONENT.CUSTOM_RENDER:
							render = item.render;
							break;
						default:
							break;
					}

					return {
						...newItem,
						render,
						sorter,
						align,
					};
					// return newItem
				});
			} else {
				return [];
			}
		};

		return renderColumn(columns);
	}, [columns, dataSource]);

	const handleSearch = (
		selectedKeys: string[],
		confirm: (params?: FilterConfirmProps) => void,
		dataIndex
	) => {
		confirm();
	};

	const showSizeChanger = () => {
		let lengthData = dataSource?.length || 0;
		if (pagination) {
			lengthData = pagination.total || 0;
		}

		return lengthData > SIZE_MAX ? true : false;
	};

	const onRowClassName = (record) => {
		if (rowClassName) {
			return rowClassName(record);
		}
		return record?.rowClassName || "";
	};

	const renderPageOption = () => {
		const total = pagination?.total || 0;

		if (!total) {
			return pageSizeOptions;
		}

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

	return (
		<>
			<Table
				rowClassName={onRowClassName}
				tableLayout={tableLayout}
				size={"middle"}
				columns={columnsTable}
				dataSource={dataSource}
				rowSelection={rowSelection}
				rowKey={rowKey}
				expandable={expandable}
				loading={loading}
				bordered={bordered}
				pagination={
					!!showPagination && {
						showSizeChanger: showSizeChanger(),
						showTotal: (total, range) => {
							return `Bảng ghi từ ${range[0]} đến ${range[1]} trên ${total} kết quả`;
						},
						...pagination,

						onChange: (page, pageSize) => {
							if (Number.isNaN(pageSize)) {
								pagination?.onChange?.(page, pagination?.total || 0);
								return;
							}

							pagination?.onChange?.(page, pageSize);
						},

						pageSizeOptions: renderPageOption(),
					}
				}
				locale={{
					// emptyText: 'Không có dữ liệu',
					triggerDesc: "Nhấp để sắp xếp giảm dần",
					triggerAsc: "Nhấp để sắp xếp tăng dần",
					cancelSort: "Nhấp để huỷ sắp xếp",
					filterReset: "Xoá",
					filterConfirm: "Lọc",
				}}
				scroll={scroll}
				summary={summary}
				sticky={sticky}
				components={components}
			/>
		</>
	);
};

export default TableComp;
