import { getAccessToken } from "@features/auth"
import { api } from "."

api.interceptors.request.use((config) => {
	const accessToken = getAccessToken()
	if (accessToken) {
		config.headers.Authorization = `Bearer ${accessToken}`
	}
	return config
})

// api.interceptors.response.use((config) => config, async (error) => {
// 	// const useRefresh = useAuthStore(state => state.refresh)
// 	// console.log('api.interceptors.response')

// 	try {
// 		if (error.response.status === 401) {
// 			const originalRequest = error.config
// 			// await useRefresh()
// 			return api.request(originalRequest)
// 		}
// 	}
// 	catch (error) {
// 		console.log(error)
// 	}

// 	return Promise.reject(error)
// })
