import { LogErrorRepository } from '../../data/protocols/db';
import {
  Controller,
  HttpRequest,
  HttpResponse,
  serverError,
} from '../../presentation';
import { LogControllerDecorator } from './log';

interface SutTypes {
  sut: LogControllerDecorator;
  controllerStub: Controller;
  logErrorRepositoryStub: LogErrorRepository;
}

const makeLogErrorRepository = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    async log(stack: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new LogErrorRepositoryStub();
};

const makeController = () => {
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

const makeSut = (): SutTypes => {
  const controllerStub = makeController();
  const logErrorRepositoryStub = makeLogErrorRepository();
  const logControllerDecorator = new LogControllerDecorator(
    controllerStub,
    logErrorRepositoryStub
  );

  return {
    sut: logControllerDecorator,
    controllerStub,
    logErrorRepositoryStub,
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

  test('Should returns the same return of the controller', async () => {
    const { sut } = makeSut();

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    const httpResponse = await sut.handle(httpRequest);

    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {},
    });
  });

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut();
    const fakeError = new Error();
    fakeError.stack = 'any_stack';
    const error = serverError(fakeError);

    const logSpy = jest.spyOn(logErrorRepositoryStub, 'log');

    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(new Promise((resolve) => resolve(error)));

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_mail@mail.com',
        password: 'any_password',
        passwordConfirmation: 'any_password',
      },
    };

    await sut.handle(httpRequest);

    expect(logSpy).toHaveBeenCalledWith('any_stack');
  });
});
