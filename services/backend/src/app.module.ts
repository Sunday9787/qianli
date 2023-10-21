import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductModule } from './product/product.module'
import { LayoutService } from './layout/layout.service'
import { AboutModule } from './about/about.module'

@Module({
  imports: [ProductModule, AboutModule],
  controllers: [AppController],
  providers: [AppService, LayoutService]
})
export class AppModule {}
