import { Module } from '@nestjs/common'

import { CategoryModule } from './category/category.module'
import { CommonController } from './common.controller'
import { CommonService } from './common.service'
import { DepartmentModule } from './department/department.module'

@Module({
  imports: [DepartmentModule, CategoryModule],
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
