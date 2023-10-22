import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LayoutService } from './layout/layout.service'
import { ProductModule } from './product/product.module'
import { AboutModule } from './about/about.module'
import { ContactModule } from './contact/contact.module'
import { NewsModule } from './news/news.module'
import { PostModule } from './post/post.module'

@Module({
  imports: [ProductModule, AboutModule, ContactModule, NewsModule, PostModule],
  controllers: [AppController],
  providers: [AppService, LayoutService]
})
export class AppModule {}
