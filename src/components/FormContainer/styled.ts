import styled from 'styled-components'
import { Col, Row } from 'antd'

export const ColStyled = styled(Col)`
	input.ant-input-disabled {
		color: #2d3c56;
	}
`

export const RowStyled = styled(Row)`
	.ant-row {
		max-height: 30vh;
		flex-wrap: nowrap;

		.ant-col {
			max-height: 20vh;
			overflow-y: auto;

			&::-webkit-scrollbar {
				width: 7px;
				height: 7px;
				border-radius: 3.5px;
				left: -0.5rem;
			}
			&::-webkit-scrollbar-track {
				background: #f1f1f1;
				border-radius: 3.5px;
				width: 7px;
			}
			&::-webkit-scrollbar-thumb {
				background: #c4c4c4;
				border-radius: 3.5px;
			}
			&::-webkit-scrollbar-thumb:hover {
				background: #c4c4c4;
			}
		}
	}
`
