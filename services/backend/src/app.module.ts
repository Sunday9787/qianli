import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AppController } from './app.controller'
import { AppService } from './app.service'

import { LayoutModule } from './layout/layout.module'
import { ProductModule } from './product/product.module'
import { AboutModule } from './about/about.module'
import { ContactModule } from './contact/contact.module'
import { NewsModule } from './news/news.module'
import { PostModule } from './post/post.module'
import { CategoryModule } from './category/category.module'
import { DepartmentModule } from './department/department.module'
import { JobModule } from './job/job.module'

import { DepartmentEntity } from './department/department.entity'
import { ContactFeedbackEntity } from './contact/contact.feedback.entity'
import { CategoryEntity } from './category/category.entity'
import { ContactEntity } from './contact/contact.entity'
import { AboutEntity } from './about/about.entity'
import { PostEntity } from './post/post.entity'
import { JobEntity } from './job/job.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'qianli',
      password: '123123',
      database: 'qianli',
      // synchronize: true,
      entities: [
        PostEntity,
        CategoryEntity,
        JobEntity,
        DepartmentEntity,
        AboutEntity,
        ContactEntity,
        ContactFeedbackEntity
      ]
    }),
    LayoutModule,
    ProductModule,
    AboutModule,
    ContactModule,
    NewsModule,
    PostModule,
    CategoryModule,
    JobModule,
    DepartmentModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
