import { Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { UserModule } from '@/user/user.module'

import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategy/jwt.strategy'
import { LocalStrategy } from './strategy/local.strategy'

@Module({
  imports: [
    PassportModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory(configService: ConfigService<APPConfig>) {
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions: {
            expiresIn: configService.get('JWT_EXPIRES_IN')
          }
        }
      },
      inject: [ConfigService]
    })
  ],
  providers: [AuthService, JwtStrategy, LocalStrategy],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule {}
