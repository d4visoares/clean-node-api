import { MissingParamError } from '../errors';
import { HttpRequest, HttpResponse } from '../protocols';
import { badRequest } from '../utils';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name)
      return badRequest(new MissingParamError('name'));

    return badRequest(new MissingParamError('email'));
  }
}
