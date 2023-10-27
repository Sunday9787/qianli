import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { CommonController } from './common.controller'
import { DepartmentModule } from './department/department.module'

@Module({
  imports: [DepartmentModule],
  providers: [CommonService],
  controllers: [CommonController]
})
export class CommonModule {}
