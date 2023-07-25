import {
  Validation,
  badRequest,
  ok,
  serverError,
  unauthorized,
} from '@/presentation/utils';

import {
  Authentication,
  Controller,
  HttpRequest,
  HttpResponse,
} from './login-controller-protocols';

export class LoginController implements Controller {
  constructor(
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body);

      if (error) {
        return badRequest(error);
      }

      const { email, password } = httpRequest.body;

      const token = await this.authentication.auth({ email, password });

      if (!token) return unauthorized();

      return ok({
        token,
      });
    } catch (error) {
      return serverError(error);
    }
  }
}
