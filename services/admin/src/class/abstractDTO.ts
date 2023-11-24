import { instanceToPlain } from 'class-transformer'
type ExcludeEntityAttribute =
  | 'toJSON'
  | 'save'
  | 'server'
  | 'create'
  | 'reset'
  | 'del'
  | 'select'
  | 'init'
  | 'upload'
  | 'process'
export type EntityQuery<T, Attr = unknown> = Omit<T, ExcludeEntityAttribute & Attr>
export type EntityJSON<T> = Omit<T, ExcludeEntityAttribute>

export abstract class AbstractEntity {
  protected sourceValue: EntityJSON<this> = Object.create(null)

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
    return instanceToPlain(this, { excludeExtraneousValues: true }) as EntityJSON<this>
  }
}
