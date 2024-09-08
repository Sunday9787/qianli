import { CacheInterceptor } from '@nestjs/cache-manager'
import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseInterceptors,
  UsePipes
} from '@nestjs/common'

import { ValidationPipe } from '@/pipe/validation.pipe'

import { UserDTO, UserForgetDTO, UserQueryDTO } from './user.dto'
import { UserService } from './user.service'

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Put('save')
  save(@Body() body: UserDTO) {
    return this.userService.save(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list(@Body() body: UserQueryDTO) {
    return this.userService.all(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('forget')
  forget(@Body() body: UserForgetDTO) {
    return this.userService.forget(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del/:id')
  del(@Param('id', new ParseIntPipe()) id: number) {
    return this.userService.del(id)
  }
}
