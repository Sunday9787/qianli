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
  ValidationPipe
} from '@nestjs/common'
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
  @Post('add')
  add(@Body() body: PostDTO) {
    console.log(body)
    return this.postService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ transform: true }))
  @Post('list')
  list(@Body() body: PostQueryDTO) {
    return this.postService.all(body)
  }
}
