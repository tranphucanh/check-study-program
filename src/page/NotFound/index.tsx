// Libraries
import { Button } from 'antd'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import NotFoundImg from '@assets/images/404.png'

interface NotFoundProps {}

const NotFound: React.FC<NotFoundProps> = () => {
	const navigate = useNavigate()

	return (
		<div style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}>
			<div
				style={{
					flexDirection: 'column',
					justifyContent: 'center',
					display: 'flex',
					alignItems: 'center',
					gap: 20,
					marginLeft: 20,
				}}
			>
				<div style={{ fontSize: 54, color: '#E46F4A', fontWeight: 600 }}>Xin lỗi</div>
				<div style={{ fontSize: 32, color: '#014F43', fontWeight: 600 }}>Trang bạn đang tìm kiếm không tồn tại!</div>
				<Button type='primary' onClick={() => navigate('/')} style={{ width: 200 }}>
					Về màn hình chính
				</Button>
			</div>
			<div>
				<img src={NotFoundImg} />
			</div>
		</div>
	)
}

export default NotFound
