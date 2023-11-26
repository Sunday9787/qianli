import { instanceToPlain } from 'class-transformer'

type ObjectKey<T> = keyof T extends `${infer U}` ? U : string
type AbstractEntityMethodKey = ObjectKey<AbstractEntity> | 'sourceValue'
type EntityMethodKey = ObjectKey<EntityMethod>
type ExcludeEntityAttribute = EntityMethodKey | AbstractEntityMethodKey
export type EntityQuery<T, Attr = unknown> = Omit<T, ExcludeEntityAttribute & Attr>
export type EntityJSON<T> = Omit<T, ExcludeEntityAttribute>

export interface EntityMethod {
  /** 添加/更新当前实例 */
  save?(): Promise<null>
  /** 获取实例详情 */
  detail?(): unknown
  upload?(...args: unknown[]): unknown
  process?(): unknown
  logIn?(): unknown
  logOut?(): unknown
  /** 复制 数据到 当前实例 */
  copy?(data: unknown): unknown
}

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
