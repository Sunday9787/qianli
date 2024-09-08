import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Render,
  UseInterceptors,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'

import { Public } from '@/decorator/public'

import { PostDTO, PostQueryDTO } from './post.dto'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Public()
  @Get(':id')
  @Render('post')
  render(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.data(id)
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe())
  @Put('save')
  save(@Body() body: PostDTO) {
    return this.postService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del')
  del(@Param('id') id: number) {
    return this.postService.del(id)
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('list')
  list(@Body() body: PostQueryDTO) {
    return this.postService.all(body, true)
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post(':id')
  detail(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.detail(id)
  }
}
