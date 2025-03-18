interface IMatchRule {
	name: string;
	label: React.ReactNode;
}

export interface ValidationForm {
	required?: boolean;
	length?: number;
	min?: number;
	max?: number;
	type?: "string" | "number" | "boolean" | "date" | "email";
	percentage?: boolean;
	maxValue?: number;
	minValue?: number;
	match?: IMatchRule;
	notMatch?: IMatchRule;
	maxSelections?: number;
	minSelections?: number;
	messError?: string;
}

export interface DataOption {
	value: any;
	label: string | React.ReactNode;
}

interface IShowTime {
	format: string;
}

export interface FormModel {
	type?: string;
	label?: string;
	name: string | (number | string)[];
	validation?: ValidationForm;
	dataOption?: DataOption[];
	placeholder?: string;
	disabled?: boolean;
	mode?: "multiple" | "tags";
	sizeSpan?: number;
	disabledDate?: (value: any) => void;
	dependencies?: string[];
	hidden?: boolean;
	allowClear?: boolean;
	min?: number;
	max?: number;
	maxTagCount?: "responsive" | number;
	showTime?: IShowTime;
}
