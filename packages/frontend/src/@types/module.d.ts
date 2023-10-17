declare module '*.css'
declare module '*.module.css' {
  declare const style: Record<string, string>
  export default style
}

declare module '*.styl'
declare module '*.module.styl' {
  declare const style: Record<string, string>
  export default style
}
