import { LoadAccountByEmailRepository } from '@/data/protocols/db';

import { AccountModel } from '../account/db-add-account-protocols';
import { DbAuthentication } from './db-authentication';

interface SutTypes {
  sut: DbAuthentication;
  accountRepositoryStub: LoadAccountByEmailRepository;
}

const makeFakeAccount = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'any_password',
});

const makeAuthentication = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeAccountRepository = () => {
  class AccountRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new AccountRepositoryStub();
};

const makeSut = (): SutTypes => {
  const accountRepositoryStub = makeAccountRepository();

  return {
    sut: new DbAuthentication(accountRepositoryStub),
    accountRepositoryStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', () => {
    const { sut, accountRepositoryStub } = makeSut();

    const loadByEmaildSpy = jest.spyOn(accountRepositoryStub, 'loadByEmail');

    sut.auth(makeAuthentication());

    expect(loadByEmaildSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throws if LoadAccountByEmailRepository throws', () => {
    const { sut, accountRepositoryStub } = makeSut();

    jest
      .spyOn(accountRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeAuthentication());

    expect(promise).rejects.toThrow();
  });
});
