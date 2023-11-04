import { Controller, Get, Query, Render, UsePipes, ValidationPipe } from '@nestjs/common'
import { NewsService } from './news.service'
import { PostQueryDTO } from '@/post/post.dto'

class NewsQueryDTO extends PostQueryDTO {
  constructor(size = 7, current = 1) {
    super(size, current)
  }
}

@Controller('news')
export class NewsController {
  constructor(private newsService: NewsService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  @Render('news')
  render(@Query() query: NewsQueryDTO) {
    return this.newsService.data(query)
  }
}
