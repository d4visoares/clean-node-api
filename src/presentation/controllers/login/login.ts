import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, ok, serverError } from '@/presentation/utils';

import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { Authentication, EmailValidator } from './login-protocols';

export class LoginController implements Controller {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body;

      if (!email) return badRequest(new MissingParamError('email'));

      if (!password) return badRequest(new MissingParamError('password'));

      const emailIsValid = this.emailValidator.isValid(email);

      if (!emailIsValid) return badRequest(new InvalidParamError('email'));

      this.authentication.auth(email, password);

      return ok({});
    } catch (error) {
      return serverError(error);
    }
  }
}
