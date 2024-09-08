import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { plainToInstance } from 'class-transformer'
import { Between, Like, Repository } from 'typeorm'

import { QianliQuery } from '@/class/query'
import { md5 } from '@/tools'

import { UserDTO, UserForgetDTO, UserQueryDTO, UserResponseDTO } from './user.dto'
import { UserEntity } from './user.entity'

@Injectable()
export class UserService {
  constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}

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
      return plainToInstance(UserResponseDTO, entity)
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

  findByEmail(email: string) {
    return this.userRepository.findOneBy({ email })
  }
}
