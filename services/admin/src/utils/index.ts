import dayjs from 'dayjs'

export function formatDate(date: Date | string | number | null) {
  if (date) return dayjs(date).format('YYYY-MM-DD HH:mm:ss')
}

export function wait(time: number) {
  return new Promise(resolve => {
    setTimeout(resolve, time)
  })
}
