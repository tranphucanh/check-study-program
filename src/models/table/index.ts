import React from "react";
import { TYPE_COMPONENT } from "@/utility/enum";

export interface IColumn {
	key: string;
	title: string | React.ReactNode;
	className?: string;
	type?: TYPE_COMPONENT;
	sort?: boolean | string;
	search?: string;
	filter?: string;
	valueType?: any;
	children?: IColumn[];
	width?: number;
	fixed?: "left" | "right" | string;
	filterSearch?: boolean;
	filterMode?: string;
	onCell?: (record: any, rowIndex: number) => void;
	render?: any;
	colSpan?: (params: any) => any;
	cellStyle?: (params: any) => any;
	field?: string;
	keyExport?: string;
	editable?: boolean;
}

export interface IColumnGrid {
	field: string;
}
