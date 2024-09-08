import { SetMetadata } from '@nestjs/common'

export const IS_PROTECTED_KEY = 'isProtected'
export const Protect = () => SetMetadata(IS_PROTECTED_KEY, true)
