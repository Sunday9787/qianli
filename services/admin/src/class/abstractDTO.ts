import { instanceToPlain } from 'class-transformer'

export abstract class AbstractDTO {
  abstract save(): Promise<unknown>

  toJSON() {
    return instanceToPlain(this, { excludeExtraneousValues: true }) as Omit<this, 'toJSON' | 'save' | 'server'>
  }
}
