import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ConfigModule } from '@nestjs/config'
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
import { ContactFeedbackEntity } from './contact/contact.feedback.entity'
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

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'qianli',
      password: '123123',
      database: 'qianli',
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
        ContactFeedbackEntity,
        ProductEntity,
        ProductFeatureEntity,
        ProductScenarioEntity,
        ProductSpecEntity,
        ProductFileEntity
      ]
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
export class AppModule {}
