import { Controller, Get, Render, Param, ParseIntPipe } from '@nestjs/common'
import { PostService } from './post.service'

@Controller('post')
export class PostController {
  constructor(private postService: PostService) {}

  @Get(':id')
  @Render('post')
  render(@Param('id', new ParseIntPipe()) id: number) {
    return this.postService.data(id)
  }
}
