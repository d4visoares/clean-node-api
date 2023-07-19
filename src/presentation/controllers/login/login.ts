import { MissingParamError } from '@/presentation/errors';
import { badRequest } from '@/presentation/utils';

import { Controller, HttpRequest, HttpResponse } from '../../protocols';

export class LoginController implements Controller {
  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    return badRequest(new MissingParamError('email'));
  }
}
