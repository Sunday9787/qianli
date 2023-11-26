import { instanceToPlain } from 'class-transformer'
type ExcludeEntityAttribute =
  | 'toJSON'
  | 'save'
  | 'server'
  | 'create'
  | 'reset'
  | 'init'
  | 'detail'
  | 'upload'
  | 'process'
  | 'logIn'
  | 'logOut'
  | 'copy'
  | 'sourceValue'
export type EntityQuery<T, Attr = unknown> = Omit<T, ExcludeEntityAttribute & Attr>
export type EntityJSON<T> = Omit<T, ExcludeEntityAttribute>

export abstract class AbstractEntity {
  protected sourceValue: EntityJSON<this> = Object.create(null)

  public static toJSON<T extends object>(context: T) {
    return instanceToPlain(context, { excludeExtraneousValues: true }) as EntityJSON<T>
  }

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
    return AbstractEntity.toJSON(this)
  }
}
