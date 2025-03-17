// Libraries
import React from 'react'
import { Space, Tooltip } from 'antd'

// Icon
import { DeleteTwoTone, EditTwoTone, EllipsisOutlined } from '@ant-design/icons'

// Styles
import { theme } from '@/styles/theme'

// Utils
import { labelAction } from '../constants'
import { ACTION_ENUM } from '@/utility/enum'

interface IAction {
	types?: string[]
	onClick?: (type: string) => void
}

const Action: React.FC<IAction> = ({ types, onClick }) => {
	const renderBtnAction = () => {
		if (types && types.length) {
			return types.map((type) => {
				let itemElm = <></>

				switch (type) {
					case ACTION_ENUM.EDIT:
						itemElm = <EditTwoTone />
						break

					case ACTION_ENUM.DELETE:
						itemElm = <DeleteTwoTone twoToneColor={theme.red5} />
						break

					case ACTION_ENUM.MORE:
						itemElm = <EllipsisOutlined style={{ fontSize: 16 }} />
						break
				}

				return (
					<Tooltip key={type} title={labelAction[type]}>
						<div style={{ fontSize: 14, cursor: 'pointer' }} onClick={() => onClick?.(type)}>
							{itemElm}
						</div>
					</Tooltip>
				)
			})
		} else return null
	}

	return <Space size={20}>{renderBtnAction()}</Space>
}

export default Action
