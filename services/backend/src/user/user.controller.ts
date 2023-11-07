import {
  Body,
  Controller,
  Delete,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserAddDTO, UserDTO, UserEditDTO } from './user.dto'

@UsePipes(new ValidationPipe())
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: UserAddDTO) {
    return this.userService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('edit')
  edit(@Body() body: UserEditDTO) {
    console.log(body)
  }

  @HttpCode(HttpStatus.OK)
  @Delete('del')
  del(@Param('id', new ParseIntPipe()) id: number) {
    console.log(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: UserDTO) {
    const response = await this.userService.login(body)

    if (!response) {
      return new HttpException({ message: '用户名或密码不正确' }, HttpStatus.UNAUTHORIZED)
    }

    return response
  }
}
