export const EMPTY_SANITIZED_EMAIL =
  'Email subject and/or body empty after removing invalid HTML tags'

export class MessageError extends Error {
  constructor(message = EMPTY_SANITIZED_EMAIL) {
    super(message)
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
    Error.captureStackTrace(this)
  }
}
