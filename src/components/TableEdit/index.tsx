// Libraries
import type { InputRef } from "antd";
import { Form } from "antd";
import { isEqual } from "lodash";
import React, { useContext, useEffect, useRef, useState } from "react";

// Components
import { FormItem, Table } from "@/components";

// Models
import { FormModel, IColumn } from "@/models";

// Styles
import { EditCell } from "./styled";

// Models
import { TableProps } from "@/components/Table";
import { DATE_FORMAT } from "@/utility/constants";
import { TYPE_COMPONENT } from "@/utility/enum";
import dayjs from "dayjs";

interface TableEditProps extends TableProps {
	onChangeCell?: (row: any, field?: any) => void;
	disabled?: boolean;
}

interface EditableCellProps {
	editable: boolean;
	children: React.ReactNode;
	dataIndex: any;
	title: string;
	record: any;
	field: FormModel;
	handleSave: (record, field?: any) => void;
}

interface EditableRowProps {
	index: number;
}

const EditableContext = React.createContext<any>(null);

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
	const [form] = Form.useForm();
	return (
		<Form form={form} component={false}>
			<EditableContext.Provider value={form}>
				<tr {...props} />
			</EditableContext.Provider>
		</Form>
	);
};

const EditableCell: React.FC<EditableCellProps> = ({
	editable,
	children,
	dataIndex,
	title,
	record,
	handleSave,
	field,
	...restProps
}) => {
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<InputRef>(null);
	const form = useContext(EditableContext)!;

	useEffect(() => {
		if (editing) {
			inputRef.current?.focus();
		}
	}, [editing]);

	useEffect(() => {
		if (editable) {
			form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
		}
	}, [editable, record]);

	const toggleEdit = () => {
		setEditing(!editing);
		form?.setFieldsValue({ [dataIndex]: record[dataIndex] });
	};

	const save = async (event) => {
		try {
			let newDate: any = undefined;

			if (field.type === TYPE_COMPONENT.DATE_PICKER) {
				const newValue = event.target.value;
				newDate = dayjs(newValue, DATE_FORMAT).isValid()
					? dayjs(newValue, DATE_FORMAT)
					: undefined;
			}

			const values = await form.validateFields();

			let valueForm = newDate || values?.[dataIndex];

			if (!isEqual(valueForm, record[dataIndex])) {
				toggleEdit();
				handleSave(
					{ ...record, ...values, [dataIndex]: valueForm },
					{ [dataIndex]: valueForm }
				);
			}
		} catch (errInfo) {}
	};

	let childNode = children;

	if (editable) {
		childNode = <FormItem onBlur={save} field={field} showLabel={false} />;
		// childNode = editing ? (
		// 	<Form.Item
		// 		style={{ margin: 0 }}
		// 		name={dataIndex}
		// 		rules={[
		// 			{
		// 				required: true,
		// 				message: `${title} is required.`,
		// 			},
		// 		]}
		// 	>
		// 		<Input ref={inputRef} onPressEnter={save} onBlur={save} />
		// 	</Form.Item>
		// ) : (
		// 	<div className='editable-cell-value-wrap' onClick={toggleEdit}>
		// 		{children}
		// 	</div>
		// )
	}

	return <td {...restProps}>{childNode}</td>;
};

const TableEdit: React.FC<TableEditProps> = ({
	columns,
	onChangeCell,
	disabled = false,
	...props
}) => {
	const handleSave = (row, field) => {
		onChangeCell?.(row, field);
	};

	const buildColumns = (col: IColumn) => {
		if (!col?.editable) {
			return col;
		}

		const newCol = {
			...col,
			onCell: (record: any) => ({
				record,
				editable: !!col.editable && !disabled,
				handleSave,
				dataIndex: col.key,
				field: {
					...col,
					label: col.title,
					name: col.key,
				},
			}),
		};

		if (col?.children) {
			newCol.children = col?.children?.map(buildColumns);
		}

		return newCol;
	};

	const columnsEdit = columns?.map(buildColumns);

	const components = {
		body: {
			row: EditableRow,
			cell: EditableCell,
		},
	};

	return (
		<EditCell>
			<Table
				rowClassName={() => `editable-row`}
				components={components}
				{...props}
				columns={columnsEdit}
			/>
		</EditCell>
	);
};

export default TableEdit;
