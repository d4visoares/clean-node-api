import { LoadAccountByEmailRepository } from '@/data/protocols/db';

import { AccountModel } from '../account/db-add-account-protocols';
import { DbAuthentication } from './db-authentication';

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', () => {
    class AccountRepositoryStub implements LoadAccountByEmailRepository {
      async load(email: string): Promise<AccountModel> {
        const account = {
          id: 'any_id',
          name: 'any_name',
          email: 'any_email',
          password: 'any_password',
        };

        return new Promise((resolve) => resolve(account));
      }
    }

    const loadAccountByEmailRepositoryStub = new AccountRepositoryStub();

    const sut = new DbAuthentication(loadAccountByEmailRepositoryStub);

    const loadSpy = jest.spyOn(loadAccountByEmailRepositoryStub, 'load');

    sut.auth({
      email: 'any_email@mail.com',
      password: 'any_password',
    });

    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com');
  });
});
