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

import { PostEntity } from './post/post.entity'
import { CategoryEntity } from './category/category.entity'
import { CategoryModule } from './category/category.module'
import { JobModule } from './job/job.module'
import { DepartmentModule } from './department/department.module'
import { JobEntity } from './job/job.entity'
import { DepartmentEntity } from './department/department.entity'
import { AboutEntity } from './about/about.entity'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.0.102',
      port: 3306,
      username: 'qianli',
      password: '123123',
      database: 'qianli',
      // synchronize: true,
      entities: [PostEntity, CategoryEntity, JobEntity, DepartmentEntity, AboutEntity]
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
