import { HashComparer } from '@/data/protocols/cryptography';
import { LoadAccountByEmailRepository } from '@/data/protocols/db';

import { AccountModel } from '../account/db-add-account-protocols';
import { DbAuthentication } from './db-authentication';

interface SutTypes {
  sut: DbAuthentication;
  accountRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
}

const makeFakeAccount = () => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email',
  password: 'hashed_password',
});

const makeAuthentication = () => ({
  email: 'any_email@mail.com',
  password: 'any_password',
});

const makeHashComparer = () => {
  class HashComparerStub implements HashComparer {
    async compare(value: string, hash: string): Promise<boolean> {
      return new Promise((resolve) => resolve(true));
    }
  }

  return new HashComparerStub();
};

const makeAccountRepository = () => {
  class AccountRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail(email: string): Promise<AccountModel | null> {
      return new Promise((resolve) => resolve(makeFakeAccount()));
    }
  }

  return new AccountRepositoryStub();
};

const makeSut = (): SutTypes => {
  const accountRepositoryStub = makeAccountRepository();
  const hashComparerStub = makeHashComparer();

  return {
    sut: new DbAuthentication(accountRepositoryStub, hashComparerStub),
    accountRepositoryStub,
    hashComparerStub,
  };
};

describe('DbAuthentication UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', () => {
    const { sut, accountRepositoryStub } = makeSut();

    const loadByEmaildSpy = jest.spyOn(accountRepositoryStub, 'loadByEmail');

    sut.auth(makeAuthentication());

    expect(loadByEmaildSpy).toHaveBeenCalledWith('any_email@mail.com');
  });

  test('Should throw if LoadAccountByEmailRepository throws', () => {
    const { sut, accountRepositoryStub } = makeSut();

    jest
      .spyOn(accountRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((_, reject) => reject(new Error())));

    const promise = sut.auth(makeAuthentication());

    expect(promise).rejects.toThrow();
  });

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, accountRepositoryStub } = makeSut();

    jest
      .spyOn(accountRepositoryStub, 'loadByEmail')
      .mockReturnValueOnce(new Promise((resolve) => resolve(null)));

    const accessToken = await sut.auth(makeAuthentication());

    expect(accessToken).toBeNull();
  });

  test('Should call hashComparer with correct values', async () => {
    const { sut, hashComparerStub } = makeSut();

    const compareSpy = jest.spyOn(hashComparerStub, 'compare');

    await sut.auth(makeAuthentication());

    expect(compareSpy).toHaveBeenCalledWith('any_password', 'hashed_password');
  });

  test('Should throw if HashComparer throws', () => {
    const { sut, hashComparerStub } = makeSut();

    jest.spyOn(hashComparerStub, 'compare').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.auth(makeAuthentication());

    expect(promise).rejects.toThrow();
  });
});
