// Libraries
import React, { CSSProperties } from "react";
import {
	Input,
	Form,
	InputNumber,
	Select,
	DatePicker,
	Radio,
	Checkbox,
	Typography,
	Tooltip,
} from "antd";
import { pick } from "lodash";

// Components
import { NumberPicker } from "@/components";

// Models
import { FormModel } from "@/models";

// Styles
import { ColStyled, RowStyled } from "./styled";

// Utils
import { TYPE_COMPONENT } from "@/utility/enum";
import { Gutter } from "antd/es/grid/row";
import { validationForm } from "../constants";

const { TextArea, Password } = Input;
const { Group } = Radio;
const { Text } = Typography;

interface FormContainerProps {
	fields?: FormModel[];
	sizeSpan?: number;
	gutter?: Gutter | [Gutter, Gutter];
	justify?: any;
	style?: CSSProperties;
}

interface FormItemProps {
	field: FormModel;
	onBlur?: (event: any) => void;
	showLabel?: boolean;
}

const DatePickerFC: any = DatePicker;

const DATE_FORMAT = "DD/MM/YYYY";

const FormItem: React.FC<FormItemProps> = ({
	field,
	onBlur,
	showLabel = true,
}) => {
	let newItem: any = <></>;
	let valuePropName = "value";
	const label = field?.label ? (
		<Text style={{ width: "100%" }} ellipsis={{ tooltip: field.label }}>
			{field.label}
		</Text>
	) : null;
	const fieldFormItem = pick(field, [
		"name",
		"disabled",
		"dependencies",
		"hidden",
	]);
	const fieldComponent = pick(field, [
		"disabled",
		"type",
		"label",
		"placeholder",
		"mode",
		"disabledDate",
		"allowClear",
		"maxTagCount",
	]);
	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			event.preventDefault(); // Prevent form submission on Enter key press
		}
	};
	switch (field.type) {
		case TYPE_COMPONENT.TEXT:
			newItem = (
				<Input
					{...fieldComponent}
					autoComplete="new-password"
					disabled
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.INPUT:
			newItem = (
				<Input
					{...fieldComponent}
					autoComplete="new-password"
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.INPUT_PASSWORD:
			newItem = (
				<Password
					{...fieldComponent}
					autoComplete="new-password"
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.TEXT_AREA:
			newItem = <TextArea {...fieldComponent} onBlur={onBlur} />;
			break;
		case TYPE_COMPONENT.INPUT_NUMBER:
			newItem = (
				<InputNumber
					{...fieldComponent}
					style={{ width: "100%" }}
					type={"Number"}
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.INPUT_NUMERIC:
			newItem = (
				<InputNumber
					{...fieldComponent}
					formatter={(value) =>
						`${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
					}
					parser={(value) =>
						value?.replace(/\$\s?|(,*)/g, "") as unknown as number
					}
					style={{ width: "100%" }}
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.SELECT:
			newItem = (
				<Select
					showSearch
					{...fieldComponent}
					options={field?.dataOption}
					filterOption={(input, option) =>
						(option?.label?.toString() ?? "")
							?.toLowerCase()
							.normalize()
							.includes(input.toLowerCase().normalize())
					}
					maxTagPlaceholder={
						fieldComponent.maxTagCount
							? (omittedValues) => (
									<Tooltip
										title={omittedValues.map(({ label }) => label).join(", ")}
									>
										<span>+{omittedValues.length}...</span>
									</Tooltip>
								)
							: null
					}
					onBlur={onBlur}
				/>
			);
			break;
		case TYPE_COMPONENT.DATE_PICKER:
			newItem = (
				<DatePickerFC
					format={field?.showTime ? DATE_FORMAT + " HH:mm" : DATE_FORMAT}
					{...fieldComponent}
					style={{ width: "100%" }}
					monthFormat={"MM YYYY"}
					showTime={field?.showTime}
					onBlur={onBlur}
					allowClear={false}
				/>
			);
			break;
		case TYPE_COMPONENT.RADIO_GROUP:
			newItem = <Group {...fieldComponent} options={field?.dataOption} />;
			break;
		case TYPE_COMPONENT.CHECKBOX:
			newItem = <Checkbox {...fieldComponent} />;
			valuePropName = "checked";
			break;
		case TYPE_COMPONENT.NUMBER_PICKER:
			newItem = (
				<NumberPicker
					style={{ width: "100%" }}
					{...fieldComponent}
					min={field?.min || 0}
					max={field?.max || 1}
					onBlur={onBlur}
				/>
			);
			break;
		default:
			newItem = (
				<Input
					{...fieldComponent}
					autoComplete="new-password"
					onBlur={onBlur}
				/>
			);
			break;
	}

	const rules = validationForm(
		field.label || field?.placeholder?.toString() || field.name?.toString(),
		field.validation
	);

	return (
		<Form.Item
			label={showLabel && label}
			style={{ marginBottom: 0 }}
			{...fieldFormItem}
			rules={rules}
			valuePropName={valuePropName}
			// @ts-ignore: Cannot override CompoundedComponent props
			onKeyDown={handleKeyDown}
		>
			{newItem}
		</Form.Item>
	);
};

const FormContainer: React.FC<FormContainerProps> = ({
	fields,
	sizeSpan = 24,
	gutter = [32, 10],
	justify = "start",
	style,
}) => {
	const renderForm = () => {
		return fields?.map((field, index) => {
			const spanCol = field?.sizeSpan ? field?.sizeSpan : sizeSpan;

			return (
				<ColStyled
					key={"col-" + field.type + index}
					xl={spanCol}
					md={spanCol * 2}
					sm={spanCol * 3}
					xs={24}
				>
					<FormItem field={field} />
				</ColStyled>
			);
		});
	};

	return (
		<RowStyled gutter={gutter} justify={justify} align="top" style={style}>
			{renderForm()}
		</RowStyled>
	);
};

export { FormItem };

export default FormContainer;
