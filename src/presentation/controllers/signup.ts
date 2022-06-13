import { badRequest } from './../helpers/httpHelper'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from './../protocols/http'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password']
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
