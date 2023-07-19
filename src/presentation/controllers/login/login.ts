import { InvalidParamError, MissingParamError } from '@/presentation/errors';
import { badRequest, ok } from '@/presentation/utils';

import { Controller, HttpRequest, HttpResponse } from '../../protocols';
import { EmailValidator } from './login-protocols';

export class LoginController implements Controller {
  constructor(private readonly emailValidator: EmailValidator) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body;

    if (!email) return badRequest(new MissingParamError('email'));

    if (!password) return badRequest(new MissingParamError('password'));

    const emailIsValid = this.emailValidator.isValid(email);

    if (!emailIsValid) return badRequest(new InvalidParamError('email'));

    return ok({});
  }
}
