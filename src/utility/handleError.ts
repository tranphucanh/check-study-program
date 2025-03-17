import { StatusCodeEnums } from './enum'
import { deleteAllCookie } from '.'
import { Modal } from 'antd'

export const handleError = (code: number, message?: string) => {
	if (code === StatusCodeEnums.UNAUTHORIZED) {
		deleteAllCookie()
		Modal.warning({
			content: message,
			okText: 'Đồng ý',
			onOk: () => (window.open(import.meta.env.VITE_MAIN_URL + 'login', '_self')),
		})
	}
}
