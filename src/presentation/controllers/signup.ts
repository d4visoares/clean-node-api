import { InvalidParamError, MissingParamError, ServerError } from '../errors';

import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator,
} from '../protocols';

import { badRequest, serverError } from '../utils';

export class SignUpController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
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

      if (httpRequest.body.password !== httpRequest.body.passwordConfirmation)
        return badRequest(new InvalidParamError('passwordConfirmation'));

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email);

      if (!emailIsValid) return badRequest(new InvalidParamError('email'));

      return badRequest(new MissingParamError('phone'));
    } catch (error) {
      return serverError();
    }
  }
}
