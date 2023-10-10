import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { ProductModule } from './product/product.module'
import { LayoutService } from './layout/layout.service'

@Module({
  imports: [ProductModule],
  controllers: [AppController],
  providers: [AppService, LayoutService]
})
export class AppModule {}
