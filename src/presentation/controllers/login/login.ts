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
      const requiredFields = ['email', 'password'];

      for (const field of requiredFields) {
        if (!httpRequest.body[field])
          return badRequest(new MissingParamError(field));
      }

      const { email, password } = httpRequest.body;

      const emailIsValid = this.emailValidator.isValid(email);

      if (!emailIsValid) return badRequest(new InvalidParamError('email'));

      this.authentication.auth(email, password);

      return ok({});
    } catch (error) {
      return serverError(error);
    }
  }
}
