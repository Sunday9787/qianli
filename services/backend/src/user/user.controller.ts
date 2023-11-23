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
  UseInterceptors,
  UsePipes
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'
import { UserService } from './user.service'
import { UserAddDTO, UserDTO, UserEditDTO, UserForgetDTO, UserQueryDTO } from './user.dto'
import { JwtDTO } from '@/auth/auth.jwt.dto'
import { User } from './user.decorator'
import { ValidationPipe } from '@/pipe/validation.pipe'
import { AuthGuard } from '@/auth/auth.guard'
import { AuthToken } from '@/auth/auth.decorator'

@UsePipes(ValidationPipe)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.OK)
  @Put('add')
  add(@Body() body: UserAddDTO) {
    return this.userService.add(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('edit')
  edit(@Body() body: UserEditDTO) {
    console.log(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @UseInterceptors(CacheInterceptor)
  @Post('list')
  list(@Body() body: UserQueryDTO) {
    return this.userService.all(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post('forget')
  forget(@Body() body: UserForgetDTO) {
    return this.userService.forget(body)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Delete('del')
  del(@Param('id', new ParseIntPipe()) id: number) {
    console.log(id)
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: UserDTO) {
    return this.userService.login(body)
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@AuthToken() token: string, @User() user: JwtDTO) {
    return this.userService.logout(token, user)
  }
}
