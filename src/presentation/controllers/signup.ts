import { Controller } from './../protocols/controller'
import { badRequest } from './../helpers/httpHelper'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../protocols/http'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return badRequest(new MissingParamError(field))
      }
    }

    return {
      body: '',
      statusCode: 200
    }
  }
}
