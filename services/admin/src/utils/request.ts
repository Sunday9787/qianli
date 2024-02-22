import axios, { type AxiosRequestConfig, HttpStatusCode } from 'axios'
import router from '@/router'
import store from '@/store'
import { useUserModule } from '@/store/modules/user'

const AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASE_API + '/api',
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

AxiosInstance.interceptors.request.use(
  function (config) {
    const userModule = useUserModule(store)

    if (userModule.token) {
      config.headers.Authorization = `Bearer ${userModule.token}`
      return config
    }

    return config
  },
  function (error) {
    console.warn(error)
    return Promise.reject(error)
  }
)

AxiosInstance.interceptors.response.use(
  response => {
    const req: XMLHttpRequest = response.request
    const userModule = useUserModule(store)

    /**
     * blob 文件处理
     */
    if (response.data instanceof Blob) {
      const filename = req.getResponseHeader('content-disposition')!.replace('attachment; filename=', '')
      response.data = { data: { blob: response.data, filename } }
      return response
    }

    if (response.data.code !== 200) {
      console.error(response.data)

      // ! TOKEN 失效退出登录
      if (response.data.code === HttpStatusCode.Unauthorized) {
        userModule.$reset()
        router.replace({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
      }

      return Promise.reject(response)
    }

    return response
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

export function request<R = null>(config: AxiosRequestConfig) {
  return AxiosInstance.request<AppResponse.Body<R>>(config).then(response => response.data)
}

request.put = function <R = null>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return AxiosInstance.put<AppResponse.Body<R>>(url, data, config).then(response => response.data.data)
}

request.post = function <R = null>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return AxiosInstance.post<AppResponse.Body<R>>(url, data, config).then(response => response.data.data)
}

request.delete = function <R = null>(url: string) {
  return AxiosInstance.delete<AppResponse.Body<R>>(url).then(response => response.data.data)
}

request.get = function <R = null>(url: string, config?: AxiosRequestConfig) {
  return AxiosInstance.get<AppResponse.Body<R>>(url, config).then(response => response.data.data)
}
