import dayjs from 'dayjs'

export function formatDate(date: Date | string | number | null) {
  if (date) return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}

export function resourceURL(url?: string | null) {
  if (url) {
    return import.meta.env.VITE_APP_RESOURCE_DOMAIN + url
  }
}

export function urlResource(url: string) {
  return url.replace(import.meta.env.VITE_APP_RESOURCE_DOMAIN, '')
}
