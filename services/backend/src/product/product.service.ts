import { Injectable } from '@nestjs/common'
import { LayoutService } from '@/layout/layout.service'

@Injectable()
export class ProductService {
  constructor(private layoutService: LayoutService) {}

  data() {
    return { layout: this.layoutService.layout() }
  }
}
