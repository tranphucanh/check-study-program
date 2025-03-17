// Libraries
import { Spin } from 'antd'
import React from 'react'
import { Container } from './styled'

interface LoadingProps {
	fullPage?: boolean
}

const Loading: React.FC<LoadingProps> = ({ fullPage = false }) => {
	return (
		<Container $fullPage={fullPage}>
			<Spin size='large' />
		</Container>
	)
}

export default Loading
