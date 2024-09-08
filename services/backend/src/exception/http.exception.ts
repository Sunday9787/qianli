export enum QlHttpStatus {
  /** 用户不存在 */
  USER_NOT_FOUND = 1000,
  /** 用户密码错误 */
  USER_PASSWORD_WRONG = 1001,
  /** 用户 token 失效 */
  USER_TOKEN_INVALID = 1002,
  /** 用户 REFRESH_TOKEN 失效 */
  USER_REFRESH_TOKEN_INVALID = 1003,
  /** 用户已存在 */
  USER_EXISTED = 1004,
  BAD_REQUEST = 0,
  OK_REQUEST = 200,
  /** 路径不存在 */
  SOURCE_NOT_FOUND = 400,
  /** 服务器内部错误 */
  INTERNAL_SERVER_ERROR = 500
}

export class QlHttpException extends Error {
  constructor(
    public message: string,
    public code: QlHttpStatus
  ) {
    super(message)
  }
}
