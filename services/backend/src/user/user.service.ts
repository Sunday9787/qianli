import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import md5 from 'md5'
import { UserEntity } from './user.entity'
import { UserAddDTO, UserDTO, UserEditDTO, UserForgetDTO, UserLoginDTO } from './user.dto'
import { TOKEN_SECRET } from '@/config'
import { JwtDTO } from './user.jwt.dto'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

  generateJWT(user: UserEntity) {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    const dto: JwtDTO = {
      id: user.id,
      username: user.username,
      password: user.password,
      exp: exp.getTime() / 1000
    }

    return jwt.sign(dto, TOKEN_SECRET)
  }

  async login(body: UserDTO): Promise<UserLoginDTO> {
    const user = await this.userRepository.findOne({
      where: {
        username: body.username,
        password: md5(body.password)
      }
    })

    if (!user) {
      throw new HttpException('用户名或密码不正确', HttpStatus.UNAUTHORIZED)
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

  async edit(body: UserEditDTO) {
    await this.userRepository.update({ id: body.id }, body)
  }

  async forget(body: UserForgetDTO) {
    await this.userRepository.update({ id: body.id }, { password: md5(body.password) })
  }

  del(id: number) {
    return this.userRepository.delete(id)
  }

  findById(id: number) {
    return this.userRepository.findOneBy({ id })
  }

  validateToken(token: string) {
    try {
      const decoded = jwt.verify(token, TOKEN_SECRET) as JwtDTO
      if (decoded) {
        return true
      }
      return false
    } catch {
      return false
    }
  }
}
