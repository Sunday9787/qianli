import { Controller, Get, Query, Render, UsePipes, ValidationPipe } from '@nestjs/common'

import { Public } from '@/decorator/public'
import { PostQueryDTO } from '@/post/post.dto'

import { NewsService } from './news.service'

class NewsQueryDTO extends PostQueryDTO {
  constructor(size = 7, current = 1) {
    super(size, current)
  }
}

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Public()
  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Render('news')
  render(@Query() query: NewsQueryDTO) {
    return this.newsService.data(query)
  }
}
