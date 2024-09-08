import axios, { type AxiosRequestConfig } from 'axios'

import router from '@/router'
import store from '@/store'
import { useUserModule } from '@/store/modules/user'

enum QyHttpStatus {
  USER_NOT_FOUND = 1000,
  USER_PASSWORD_WRONG = 1001,
  USER_TOKEN_INVALID = 1002,
  USER_REFRESH_TOKEN_INVALID = 1003,
  USER_EXISTED = 1004,
  BAD_REQUEST = 0,
  OK_REQUEST = 200
}

const refreshURL = new URL(baseURL('/auth/refresh'))

export function baseURL(url: string = '') {
  return [import.meta.env.VITE_APP_BASE_API, '/api', url].join('')
}

function refreshToken(token: string) {
  return request<{ access_token: string }>({
    method: 'post',
    baseURL: refreshURL.origin,
    url: refreshURL.pathname,
    params: { token }
  })
}

const AxiosInstance = axios.create({
  timeout: 5000,
  baseURL: baseURL(),
  headers: {
    'Content-type': 'application/json'
  },
  withCredentials: true
})

AxiosInstance.interceptors.request.use(
  function (config) {
    const userModule = useUserModule(store)

    if (userModule.access_token) {
      config.headers.Authorization = `Bearer ${userModule.access_token}`
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
  async function (response) {
    {
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

      if (response.data.code !== QyHttpStatus.OK_REQUEST) {
        console.error(response.data)

        // ! REFRESH__TOKEN 失效退出登录
        if (
          response.data.code === QyHttpStatus.USER_REFRESH_TOKEN_INVALID &&
          new URL(baseURL(response.config.url)).pathname === refreshURL.pathname
        ) {
          window.$message.error('token失效 请重新登录')
          console.error('token失效 请重新登录')
          userModule.$reset()
          window.setTimeout(function () {
            router.replace({ path: '/login', query: { redirect: router.currentRoute.value.fullPath } })
          }, 0)
          return Promise.reject(response)
        }

        // ! ACCESS_TOKEN 失效重试
        if (response.data.code === QyHttpStatus.USER_TOKEN_INVALID) {
          const { data } = await refreshToken(userModule.refresh_token)
          userModule.access_token = data.access_token
          window.$message.info('请重试')
          return Promise.reject(response)
        }

        window.$message.error(response.data.message)

        return Promise.reject(response)
      }

      return response
    }
  },
  function (error) {
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
