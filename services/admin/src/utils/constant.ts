const MIME = {
  picture: ['image/png', 'image/jpeg', 'image/jpg'],
  video: ['video/mp4']
}

export const ACCEPT = readonly({
  picture: MIME.picture.join(','),
  video: MIME.video.join(',')
})

export const globalChannel = readonly({
  systemThemeChange: 'system:theme:change'
})
