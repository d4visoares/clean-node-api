import { MissingParamError } from '../errors';
import { HttpRequest, HttpResponse, Controller } from '../protocols';
import { badRequest } from '../utils';

export class SignUpController implements Controller {
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
