import { type MiddlewareConsumer, Module, type NestModule, RequestMethod } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '@/user/user.module'
import { AuthGuard } from '@/auth/auth.guard'
import { PostController } from './post.controller'
import { PostService } from './post.service'
import { PostEntity } from './post.entity'
import { CategoryEntity } from '@/common/category/category.entity'

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity, CategoryEntity]), UserModule],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService]
})
export class PostModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthGuard).exclude({ path: '/post', method: RequestMethod.GET })
  }
}
