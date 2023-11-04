import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { CommonController } from './common.controller'
import { DepartmentModule } from './department/department.module'
import { CategoryModule } from './category/category.module'

@Module({
  imports: [DepartmentModule, CategoryModule],
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
