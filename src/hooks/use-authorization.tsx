import {useEffect} from 'react'
import {useNavigate} from 'react-router'

export const useAuthorization = () => {
	const navigate = useNavigate()
	
	useEffect(() => {
		const token = localStorage.getItem('token')
		if (!token) {
			navigate('/login')
		} else {
			console.log(token)
		}
	}, [])
}