// Libraries
import React from 'react'
import { Tag, TagProps } from 'antd'

interface TagColorProps extends TagProps {
	textColor?: string
}

const TagColor: React.FC<TagColorProps> = (prop) => {
	const newProp = { ...prop }
	delete newProp.textColor

	return <Tag {...newProp} style={{ color: prop.textColor }}></Tag>
}

export default TagColor
