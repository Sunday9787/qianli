import { HttpException, HttpStatus, Inject, Injectable, Logger } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like, Between } from 'typeorm'
import md5 from 'md5'
import { AuthService } from '@/auth/auth.service'
import { UserDTO, UserForgetDTO, UserLoginResponseDTO, UserQueryDTO, UserResponseDTO } from './user.dto'
import { JwtDTO } from '@/auth/auth.jwt.dto'
import { AuthDTO } from '@/auth/auth.dto'
import { QianliQuery } from '@/class/query'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(AuthService) private readonly authService: AuthService
  ) {}

  async login(body: AuthDTO): Promise<UserLoginResponseDTO> {
    const user = await this.userRepository.findOne({
      where: {
        email: body.email,
        password: md5(body.password)
      }
    })

    if (!user) {
      throw new HttpException('邮箱或密码不正确', HttpStatus.UNAUTHORIZED)
    }

    const dto = new UserLoginResponseDTO()
    dto.id = user.id
    dto.email = user.email
    dto.username = user.username
    dto.avatar = user.avatar
    dto.token = this.authService.generateJWT(user)

    await this.authService.setToken(dto)

    return dto
  }

  async logout(token: string, user: JwtDTO) {
    Logger.log(user.email, '用户退出登录')
    Logger.log(token, 'Remove Token')
    await this.authService.removeToken(user)
  }

  async save(body: UserDTO) {
    if (body.id === 0) {
      const user = await this.userRepository.findOne({ where: { email: body.email } })

      if (user) {
        throw new HttpException({ message: '已存在相同用户' }, HttpStatus.BAD_REQUEST)
      }
    }

    body.password = md5(body.password)
    await this.userRepository.save(body)
  }

  async forget(body: UserForgetDTO) {
    await this.userRepository.update({ id: body.id }, { password: md5(body.password) })
  }

  async del(id: number) {
    await this.userRepository.delete(id)
  }

  all(query: UserQueryDTO) {
    const qianliQuery = new QianliQuery(query, function (entity: UserEntity) {
      const dto = new UserResponseDTO()
      dto.id = entity.id
      dto.email = entity.email
      dto.username = entity.username
      dto.avatar = entity.avatar
      dto.created = entity.created
      dto.updated = entity.updated

      return dto
    })

    return this.userRepository
      .findAndCount({
        where: {
          username: query.username ? Like(`%${query.username}%`) : null,
          email: query.email ? Like(`%${query.email}%`) : null,
          created:
            query.created_start && query.created_end
              ? Between(new Date(query.created_start), new Date(query.created_end))
              : null
        },
        ...qianliQuery.option
      })
      .then(function (result) {
        return qianliQuery.data(result)
      })
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id })
  }
}
