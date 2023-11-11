import type { FindManyOptions } from 'typeorm'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class ListDTO<T> {
  size: number
  current: number
  total: number
  list: T[]
}

export class ListQueryDTO {
  @Type(() => Number)
  @IsNumber()
  size: number

  @Type(() => Number)
  @IsNumber()
  current: number

  constructor(size = 10, current = 1) {
    this.size = size
    this.current = current
  }
}

export class QianliQuery<T, D, Q extends ListQueryDTO> {
  private result: ListDTO<D>
  private query: Q
  public option: Pick<FindManyOptions, 'skip' | 'take'>
  private handle: (item: T) => D

  constructor(query: Q, handle: (item: T) => D) {
    this.handle = handle
    this.query = query
    this.option = { take: query.size, skip: query.size * (query.current - 1) }
    this.result = new ListDTO()
  }

  public data([result, total]: [Array<T>, number]) {
    this.result.current = this.query.current
    this.result.size = this.query.size
    this.result.total = total
    this.result.list = result.map(this.handle)

    return this.result
  }
}
