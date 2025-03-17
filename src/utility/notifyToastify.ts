import { toast, ToastContent, ToastOptions } from 'react-toastify'
import { NotifyEnums } from './enum'

interface ToastProps {
	type?: NotifyEnums
	message: ToastContent | string
	options?: ToastOptions
}

export const openNotification = ({
	type,
	message,
	options = {
		position: 'top-right',
		autoClose: 2500,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		progress: undefined,
	},
}: ToastProps) => {
	if (!type) {
		return toast(message, options)
	}

	return toast[type](message, options)
}
