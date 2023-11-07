import { Repository } from 'typeorm'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UserAddDTO, UserDTO, UserEditDTO, UserLoginDTO } from './user.dto'
import * as jwt from 'jsonwebtoken'
import md5 from 'md5'

const TOKEN_SECRET = 'qianli_secret'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  generateJWT(user: UserEntity) {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign(
      {
        id: user.id,
        username: user.username,
        password: user.password,
        exp: exp.getTime() / 1000
      },
      TOKEN_SECRET
    )
  }

  async login(body: UserDTO): Promise<UserLoginDTO> {
    const user = await this.userRepository.findOne({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    })

    if (!user) {
      return null
    }

    const dto = new UserLoginDTO()
    dto.id = user.id
    dto.username = user.username
    dto.avatar = user.avatar
    dto.token = this.generateJWT(user)

    return dto
  }

  async add(body: UserAddDTO) {
    const user = await this.userRepository.findOne({ where: { username: body.username } })

    if (user) {
      throw new HttpException({ message: '已存在相同用户名' }, HttpStatus.BAD_REQUEST)
    }

    const userEntity = new UserEntity()
    userEntity.avatar = body.avatar
    userEntity.username = body.username
    userEntity.password = md5(body.password)
    await this.userRepository.save(userEntity)
  }

  edit(body: UserEditDTO) {
    return this.userRepository.update({ id: body.id }, body)
  }

  del(id: number) {
    return this.userRepository.delete(id)
  }
}
