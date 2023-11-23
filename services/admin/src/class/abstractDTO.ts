import { instanceToPlain } from 'class-transformer'
type ExcludeAbstractEntityMethod =
  | 'toJSON'
  | 'save'
  | 'server'
  | 'create'
  | 'reset'
  | 'del'
  | 'select'
  | 'init'
  | 'upload'

export abstract class AbstractEntity {
  protected sourceValue: Omit<this, ExcludeAbstractEntityMethod> = Object.create(null)

  public init() {
    this.sourceValue = this.toJSON()
  }

  public reset() {
    for (const [key, value] of Object.entries(this.sourceValue)) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this[key] = value
    }
  }

  public toJSON() {
    return instanceToPlain(this, { excludeExtraneousValues: true }) as Omit<this, ExcludeAbstractEntityMethod>
  }
}
