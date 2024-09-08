import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AboutModule } from './about/about.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './auth/auth.module'
import { JwtAuthGuard } from './auth/guard/jwt.guard'
import { CommonModule } from './common/common.module'
import { ContactModule } from './contact/contact.module'
import { JobModule } from './job/job.module'
import { LayoutModule } from './layout/layout.module'
import { NewsModule } from './news/news.module'
import { PostModule } from './post/post.module'
import { ProductModule } from './product/product.module'
import { RedisModule } from './redis/redis.module'
import { UploadModule } from './upload/upload.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['docker.env', 'local.env'],
      expandVariables: true,
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService<APPConfig>) {
        return {
          type: 'mysql',
          synchronize: true,
          autoLoadEntities: true,
          host: configService.get('DATA_BASE_HOST'),
          port: configService.get('DATA_BASE_PORT'),
          username: configService.get('DATA_BASE_USERNAME'),
          password: configService.get('DATA_BASE_PASSWORD'),
          database: configService.get('DATA_BASE_DATABASE')
        }
      },
      inject: [ConfigService]
    }),
    RedisModule,
    LayoutModule,
    AuthModule,
    UserModule,
    ProductModule,
    AboutModule,
    ContactModule,
    NewsModule,
    PostModule,
    JobModule,
    CommonModule,
    UploadModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: JwtAuthGuard }]
})
export class AppModule {}
