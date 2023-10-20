declare namespace NodeJS {
  interface ProcessEnv {
    BUILD: string
    VERSION: string
    BUILD_DATE: string
    PLATFORM: string
  }
}
