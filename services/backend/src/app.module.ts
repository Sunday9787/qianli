import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { LayoutService } from './layout/layout.service'
import { ProductModule } from './product/product.module'
import { AboutModule } from './about/about.module'
import { ContactModule } from './contact/contact.module'

@Module({
  imports: [ProductModule, AboutModule, ContactModule],
  controllers: [AppController],
  providers: [AppService, LayoutService]
})
export class AppModule {}
