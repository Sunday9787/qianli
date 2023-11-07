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
  UseGuards,
  UsePipes
} from '@nestjs/common'
import { UserService } from './user.service'
import { UserAddDTO, UserDTO, UserEditDTO, UserForgetDTO } from './user.dto'
import { ValidationPipe } from '@/pipe/validation.pipe'
import { UserGuard } from './user.guard'

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
  @UseGuards(UserGuard)
  @Post('edit')
  edit(@Body() body: UserEditDTO) {
    console.log(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Post('forget')
  forget(@Body() body: UserForgetDTO) {
    return this.userService.forget(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(UserGuard)
  @Delete('del')
  del(@Param('id', new ParseIntPipe()) id: number) {
    console.log(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() body: UserDTO) {
    return this.userService.login(body)
  }
}