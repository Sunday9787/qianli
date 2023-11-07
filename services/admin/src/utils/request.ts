import axios, { type AxiosRequestConfig } from 'axios'
import { useMessage } from 'naive-ui'
import router from '@/router'
import store from '@/store'
import { useUserModule } from '@/store/user'

console.log(import.meta.env.VITE_APP_BASE_API)
const AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: import.meta.env.VITE_APP_BASE_API,
  headers: {
    'Content-type': 'application/json'
  }
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
    const message = useMessage()

    /**
     * blob 文件处理
     */
    if (response.data instanceof Blob) {
      const filename = req.getResponseHeader('content-disposition')!.replace('attachment; filename=', '')
      response.data = { data: { blob: response.data, filename } }
      return response
    }

    if (response.data.code !== 0) {
      message.error(response.data.message)

      // ! TOKEN 失效退出登录
      if (response.data.code === 3) {
        userModule.$reset()
        router.replace('/login')
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

export function request<R = unknown>(config: AxiosRequestConfig) {
  return AxiosInstance.request<Response.Body<R>>(config).then(response => response.data)
}

request.put = function <R = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return AxiosInstance.put<Response.Body<R>>(url, data, config).then(response => response.data.data)
}

request.post = function <R = unknown>(url: string, data?: unknown, config?: AxiosRequestConfig) {
  return AxiosInstance.post<Response.Body<R>>(url, data, config).then(response => response.data.data)
}

request.get = function <R = unknown>(url: string, config?: AxiosRequestConfig) {
  return AxiosInstance.get<Response.Body<R>>(url, config).then(response => response.data.data)
}
