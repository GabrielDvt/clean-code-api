
import { MissingParamError, InvalidParamError } from '../errors'
import { badRequest, serverError } from './../helpers/httpHelper'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from './../protocols'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }
      const isEmailValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!isEmailValid) return badRequest(new InvalidParamError('email'))

      return {
        body: '',
        statusCode: 200
      }
    } catch (e) {
      return serverError()
    }
  }
}
