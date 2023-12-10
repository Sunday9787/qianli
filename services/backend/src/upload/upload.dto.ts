import { IsNumberString, IsString } from 'class-validator'

export class UploadFileChunkDTO {
  /** 文件名 */
  @IsString()
  name: string

  /** chunk 哈希值 */
  @IsString()
  hash: string

  /** chunk 下标 */
  @IsNumberString()
  index: string

  /** chunk 总数 */
  @IsNumberString()
  total: string

  /** 文件大小 */
  @IsNumberString()
  size: string
}
