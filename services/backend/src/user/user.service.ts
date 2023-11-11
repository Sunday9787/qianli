import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, Like } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import md5 from 'md5'
import { RedisService } from '@/redis/redis.service'
import { TOKEN_SECRET } from '@/config'
import { UserEntity } from './user.entity'

import {
  UserAddDTO,
  UserDTO,
  UserEditDTO,
  UserForgetDTO,
  UserLoginResponseDTO,
  UserQueryDTO,
  UserResponseDTO
} from './user.dto'
import { JwtDTO } from './user.jwt.dto'
import { QianliQuery } from '@/class/query'

/** token 失效时间 */
const TOKEN_EXP_TIME = 1000 * 60 * 60 * 1

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>,
    @Inject(RedisService) private readonly redisService: RedisService
  ) {}

  generateJWT(user: UserEntity) {
    const today = new Date()
    const exp = new Date(today)
    exp.setHours(today.getHours() + 1)

    const dto: JwtDTO = {
      id: user.id,
      email: user.email,
      username: user.username,
      password: user.password,
      exp: exp.getTime()
    }

    return jwt.sign(dto, TOKEN_SECRET)
  }

  async login(body: UserDTO): Promise<UserLoginResponseDTO> {
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
    dto.token = this.generateJWT(user)

    this.redisService.redis.set(dto.email, dto.token, 'EX', TOKEN_EXP_TIME)

    return dto
  }

  async logout(user: JwtDTO) {
    await this.redisService.redis.del(user.email)
  }

  async add(body: UserAddDTO) {
    const user = await this.userRepository.findOne({ where: { email: body.email } })

    if (user) {
      throw new HttpException({ message: '已存在相同用户' }, HttpStatus.BAD_REQUEST)
    }

    const userEntity = new UserEntity()
    userEntity.avatar = body.avatar
    userEntity.email = body.email
    userEntity.username = body.username
    userEntity.password = md5(body.password)
    await this.userRepository.save(userEntity)
  }

  async edit(body: UserEditDTO) {
    await this.userRepository.update({ id: body.id }, body)
  }

  async forget(body: UserForgetDTO) {
    await this.userRepository.update({ id: body.id }, { password: md5(body.password) })
  }

  async del(id: number) {
    await this.userRepository.delete(id)
  }

  all(query: UserQueryDTO) {
    const qianliQuery = new QianliQuery(query, function (item: UserResponseDTO) {
      return item
    })

    return this.userRepository
      .findAndCount({
        where: {
          username: query.username ? Like(`%${query.username}%`) : null,
          email: query.email ? Like(`%${query.email}%`) : null
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

  validateToken(token: string) {
    const decoded = jwt.verify(token, TOKEN_SECRET) as JwtDTO
    if (decoded && decoded.exp > Date.now()) {
      return decoded
    }

    return null
  }
}
