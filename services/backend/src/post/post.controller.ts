import { Controller, Get, Render, Param, ParseIntPipe, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { PostService } from './post.service'
import { PostAddDTO } from './post.dto'

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
  add(@Body() body: PostAddDTO) {
    console.log(body)
    return this.postService.add(body)
  }
}
