import axios from "axios"
// import AuthService from "../../services/AuthService"
import { API_URL } from "../config/index"

const api = axios.create({
	withCredentials: true,
	baseURL: API_URL
})

// api.interceptors.request.use((config) => {
// 	const accessToken = localStorage.getItem('token')
// 	if (accessToken) {
// 		config.headers.Authorization = `Bearer ${accessToken}`
// 	}
// 	return config
// })

// api.interceptors.response.use((config) => config, async (error) => {
// 	try {
// 		if (error.response.status === 401) {
// 			const originalRequest = error.config
// 			const res = await AuthService.check()
// 			localStorage.setItem('token', res.data.accessToken)
// 			return api.request(originalRequest)
// 		}
// 	}
// 	catch (error) {
// 		console.log(error)
// 	}

// 	return Promise.reject(error)
// })

export default api
