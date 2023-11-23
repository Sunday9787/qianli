import {
  Controller,
  Get,
  Render,
  Param,
  ParseIntPipe,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UsePipes,
  ValidationPipe,
  UseGuards,
  Put,
  Delete,
  UseInterceptors
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { AuthGuard } from '@/auth/auth.guard'
import { PostService } from './post.service'
import { PostDTO, PostQueryDTO } from './post.dto'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  @Render('post')
  render(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.data(id)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  @Put('save')
  save(@Body() body: PostDTO) {
    console.log(body)
    return this.postService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('del')
  del(@Param('id') id: number) {
    return this.postService.del(id)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('list')
  list(@Body() body: PostQueryDTO) {
    return this.postService.all(body, true)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Post(':id')
  detail(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.detail(id)
  }
}
