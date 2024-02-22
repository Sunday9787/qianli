import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { SessionMiddleware } from './middleware/session'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { LayoutModule } from './layout/layout.module'
import { UserModule } from './user/user.module'
import { ProductModule } from './product/product.module'
import { AboutModule } from './about/about.module'
import { ContactModule } from './contact/contact.module'
import { NewsModule } from './news/news.module'
import { PostModule } from './post/post.module'
import { JobModule } from './job/job.module'
import { CommonModule } from './common/common.module'

import { LayoutEntity } from './layout/layout.entity'
import { DepartmentEntity } from './common/department/department.entity'
import { CategoryEntity } from './common/category/category.entity'
import { FeedbackEntity } from './contact/feedback/feedback.entity'
import { ContactEntity } from './contact/contact.entity'
import { AboutEntity } from './about/about.entity'
import { PostEntity } from './post/post.entity'
import { JobEntity } from './job/job.entity'
import { ProductEntity } from './product/product.entity'
import { ProductFeatureEntity } from './product/detail/detail.feature.entity'
import { ProductScenarioEntity } from './product/detail/detail.scenario.entity'
import { ProductSpecEntity } from './product/detail/detail.spec.entity'
import { ProductFileEntity } from './product/detail/detail.file.entity'
import { UserEntity } from './user/user.entity'
import { RedisModule } from './redis/redis.module'
import { AuthModule } from './auth/auth.module'
import { UploadModule } from './upload/upload.module'
import { config, type Config } from '@/config'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [config]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory(configService: ConfigService<Config>) {
        return {
          type: 'mysql',
          host: configService.get('DATA_BASE.DATA_BASE_HOST', { infer: true }),
          port: configService.get('DATA_BASE.DATA_BASE_PORT', { infer: true }),
          username: configService.get('DATA_BASE.DATA_BASE_USERNAME', { infer: true }),
          password: configService.get('DATA_BASE.DATA_BASE_PASSWORD', { infer: true }),
          database: configService.get('DATA_BASE.DATA_BASE_DATABASE', { infer: true }),
          // synchronize: true,
          entities: [
            LayoutEntity,
            UserEntity,
            PostEntity,
            CategoryEntity,
            JobEntity,
            DepartmentEntity,
            AboutEntity,
            ContactEntity,
            FeedbackEntity,
            ProductEntity,
            ProductFeatureEntity,
            ProductScenarioEntity,
            ProductSpecEntity,
            ProductFileEntity
          ]
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
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SessionMiddleware).forRoutes({ path: '*', method: RequestMethod.GET })
  }
}
