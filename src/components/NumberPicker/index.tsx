import {
	Button,
	ConfigProvider,
	Divider,
	InputNumber,
	InputNumberProps,
	PopoverProps,
	Popover,
	theme as antdTheme,
} from 'antd'

import type { InputProps } from 'antd'
import { CSSProperties, useEffect, useMemo, useState } from 'react'
import { useStyleRegister } from '@ant-design/cssinjs'

export type AntdNumberPickerProps = {
	// InputNumber
	className?: InputNumberProps<number>['className']
	max: NonNullable<InputNumberProps<number>['max']>
	min: NonNullable<InputNumberProps<number>['min']>
	readOnly?: InputNumberProps<number>['readOnly']
	style?: CSSProperties
} & {
	// Popover
	placement?: PopoverProps['placement']
	trigger?: PopoverProps['trigger']
} & {
	// Custom
	cols?: number
	rows?: number
} & {
	// Value
	onChange?: InputNumberProps<number>['onChange']
	value?: InputNumberProps<number>['value']
} & InputProps

// type PickerToken = Parameters<typeof genPanelStyle>[0];

const { useToken } = antdTheme

const usePaginate = (array: number[], pageNumber: number, pageSize: number) => {
	const paginatedArray = useMemo(
		() => array.slice((pageNumber - 1) * pageSize, pageNumber * pageSize),
		[array, pageNumber, pageSize]
	)
	const { length } = array

	const remainder = length % pageSize
	const totalPage = (length - remainder) / pageSize + (remainder > 0 ? 1 : 0)

	return {
		totalPage,
		array: paginatedArray,
		first: paginatedArray[0],
		last: paginatedArray[paginatedArray.length - 1],
	}
}

export default function AntdNumberPicker(props: AntdNumberPickerProps) {
	//! Props
	const numberPickerRows = props.rows ?? 7
	const numberPickerCols = props.cols ?? 7
	const placement = props.placement ?? 'bottomLeft'
	const trigger = props.trigger ?? 'click'
	const readOnly = props.readOnly ?? true
	const propsValue = useMemo(() => props.value ?? null, [props.value])

	//! Style
	const { theme, token } = useToken()
	const pickerControlIconSize = 7
	const pickerControlIconBorderWidth = 1

	useStyleRegister(
		{
			token,
			theme,
			path: ['ant-number-picker'],
		},
		() => ({
			'.ant-number-picker': {
				// Arrow button
				[`&-prev-icon,
			&-next-icon,
			&-super-prev-icon,
			&-super-next-icon`]: {
					position: 'relative',
					display: 'inline-block',
					width: pickerControlIconSize,
					height: pickerControlIconSize,

					'&::before': {
						position: 'absolute',
						top: 0,
						insetInlineStart: 0,
						display: 'inline-block',
						width: pickerControlIconSize,
						height: pickerControlIconSize,
						border: `0 solid currentcolor`,
						borderBlockStartWidth: pickerControlIconBorderWidth,
						borderBlockEndWidth: 0,
						borderInlineStartWidth: pickerControlIconBorderWidth,
						borderInlineEndWidth: 0,
						content: '""',
					},
				},

				[`&-super-prev-icon,
			&-super-next-icon`]: {
					'&::after': {
						position: 'absolute',
						top: Math.ceil(pickerControlIconSize / 2),
						insetInlineStart: Math.ceil(pickerControlIconSize / 2),
						display: 'inline-block',
						width: pickerControlIconSize,
						height: pickerControlIconSize,
						border: '0 solid currentcolor',
						borderBlockStartWidth: pickerControlIconBorderWidth,
						borderBlockEndWidth: 0,
						borderInlineStartWidth: pickerControlIconBorderWidth,
						borderInlineEndWidth: 0,
						content: '""',
					},
				},

				[`&-prev-icon,
			&-super-prev-icon`]: {
					transform: 'rotate(-45deg)',
				},

				[`&-next-icon,
			&-super-next-icon`]: {
					transform: 'rotate(135deg)',
				},
			},
			'.ant-number-picker-popover': {
				'.ant-btn': {
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					padding: '4px 0',

					'&': {
						width: '32px',
					},
					'&.ant-btn-sm': {
						width: '24px',
					},
					'&.ant-btn-lg': {
						width: '40px',
					},
					'.ant-number-picker': {
						'&-prev-icon': {
							marginLeft: '2px',
						},
						'&-next-icon': {
							marginRight: '2px',
						},
						'&-super-prev-icon': {
							marginRight: '2px',
						},
						'&-super-next-icon': {
							marginLeft: '2px',
						},
					},
				},
				'.ant-popover-inner': {
					padding: '8px',
				},
			},
			'.ant-number-picker-grid': {
				display: 'grid',
				gap: '0.25rem',
				justifyContent: 'flex-start',
				alignItems: 'center',
			},
		})
	)

	//! Data
	const [open, setOpen] = useState(false)
	const [value, setValue] = useState(propsValue)

	const numbers = useMemo(
		() => Array.from({ length: props.max - props.min + 1 }, (_, i) => i + props.min),
		[props.max, props.min]
	)

	const [pageNumber, setPageNumber] = useState(1)
	const paginatedData = usePaginate(numbers, pageNumber, numberPickerRows * numberPickerCols)

	const onChange = (valueNumber: number | null) => {
		setValue(valueNumber)
		props.onChange?.(valueNumber)
	}

	useEffect(() => {
		setValue(propsValue)
	}, [propsValue])

	const content = useMemo(() => {
		const gridTemplateColumns = Math.min(props.max - props.min + 1, numberPickerCols)

		return (
			<div
				className='ant-number-picker-grid'
				style={{
					gridTemplateColumns: `repeat(${gridTemplateColumns}, 1fr)`,
				}}
			>
				<Button type='text' disabled={pageNumber === 1} onClick={() => setPageNumber(1)}>
					<span className='ant-number-picker-super-prev-icon' />
				</Button>
				<Button
					type='text'
					disabled={pageNumber === 1}
					onClick={() => setPageNumber((pageNumber_) => pageNumber_ - 1)}
				>
					<span className='ant-number-picker-prev-icon' />
				</Button>
				<div
					style={{
						flex: 1,
						textAlign: 'center',
						fontWeight: 'bold',
						gridColumn: `span ${gridTemplateColumns - 4} / span ${gridTemplateColumns - 4}`,
					}}
				>
					{paginatedData.first}-{paginatedData.last}
				</div>
				<Button
					type='text'
					disabled={pageNumber === paginatedData.totalPage}
					onClick={() => setPageNumber((pageNumber_) => pageNumber_ + 1)}
				>
					<span className='ant-number-picker-next-icon' />
				</Button>
				<Button
					type='text'
					disabled={pageNumber === paginatedData.totalPage}
					onClick={() => setPageNumber(paginatedData.totalPage)}
				>
					<span className='ant-number-picker-super-next-icon' />
				</Button>
				<ConfigProvider theme={{ token: { marginLG: 2 } }}>
					<Divider
						style={{
							gridColumn: `span ${gridTemplateColumns} / span ${gridTemplateColumns}`,
						}}
					/>
				</ConfigProvider>
				{paginatedData.array.map((num) => (
					<Button
						key={num}
						type={props.value === num ? 'primary' : 'text'}
						onClick={() => {
							setOpen(false)
							onChange(num)
						}}
					>
						{num}
					</Button>
				))}
			</div>
		)
	}, [props.min, props.max, paginatedData, numberPickerCols, pageNumber, open])

	return (
		<Popover
			content={content}
			arrow={false}
			placement={placement}
			overlayClassName='ant-number-picker-popover'
			open={open}
			onOpenChange={setOpen}
			trigger={trigger}
		>
			<InputNumber
				style={props?.style}
				className={props.className}
				readOnly={readOnly}
				min={props.min}
				max={props.max}
				value={value}
				onChange={onChange}
			/>
		</Popover>
	)
}
