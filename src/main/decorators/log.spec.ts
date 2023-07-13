import { Controller, HttpRequest, HttpResponse } from '@/presentation';

import { LogControllerDecorator } from './log';

const makeControllerStub = () => {
  class ControllerStub implements Controller {
    handle(_: HttpRequest): Promise<HttpResponse> {
      const httpResponse: HttpResponse = {
        statusCode: 200,
        body: {},
      };

      return new Promise((resolve) => resolve(httpResponse));
    }
  }

  return new ControllerStub();
};

const makeSut = () => {
  const controllerStub = makeControllerStub();
  const logControllerDecorator = new LogControllerDecorator(controllerStub);

  return {
    sut: logControllerDecorator,
    controllerStub,
  };
};

describe('LogControllerDecorator', () => {
  test('Should call controller handle with correct values', async () => {
    const { sut, controllerStub } = makeSut();

    const handleSpy = jest.spyOn(controllerStub, 'handle');

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    sut.handle(httpRequest);

    expect(handleSpy).toHaveBeenCalledWith(httpRequest);
  });
});
