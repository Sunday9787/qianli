const MIME = {
  picture: ['image/png', 'image/jpeg', 'image/jpg']
}

export const ACCEPT = readonly({
  picture: MIME.picture.join(',')
})

export const globalChannel = readonly({
  systemThemeChange: 'system:theme:change'
})
