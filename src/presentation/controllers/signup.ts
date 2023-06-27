import { MissingParamError } from '../errors';
import { HttpRequest, HttpResponse } from '../protocols';
import { badRequest } from '../utils';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = [
      'email',
      'name',
      'password',
      'passwordConfirmation',
    ];

    for (const field of requiredFields) {
      if (!httpRequest.body[field])
        return badRequest(new MissingParamError(field));
    }

    return badRequest(new MissingParamError('phone'));
  }
}
