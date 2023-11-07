import { PipeTransform, Injectable, ArgumentMetadata, BadRequestException } from '@nestjs/common'
import { validate } from 'class-validator'
import { TransformPlainToInstance } from 'class-transformer'

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(config: { transform: boolean }) {
    console.log(config)
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value
    }

    const object = TransformPlainToInstance(metatype, value)
    const errors = await validate(object)

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed')
    }
    return value
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  private toValidate(metatype: Function): boolean {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const types: Function[] = [String, Boolean, Number, Array, Object]
    return !types.includes(metatype)
  }
}
