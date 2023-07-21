import { HashComparer, TokenGenerator } from '@/data/protocols/cryptography';
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/protocols/db';

import { AccountModel } from '../account/db-add-account-protocols';
import { DbAuthentication } from './db-authentication';

interface SutTypes {
  sut: DbAuthentication;
  accountRepositoryStub: LoadAccountByEmailRepository;
  hashComparerStub: HashComparer;
  tokenGeneratorStub: TokenGenerator;
  updateAccessTokenRepositoryStub: UpdateAccessTokenRepository;
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

const makeUpdateAccessTokenRepository = () => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async update(id: string, token: string): Promise<void> {
      return new Promise((resolve) => resolve());
    }
  }

  return new UpdateAccessTokenRepositoryStub();
};

const makeTokenGenerator = () => {
  class TokenGeneratorStub implements TokenGenerator {
    async generate(id: string): Promise<string> {
      return new Promise((resolve) => resolve('any_token'));
    }
  }

  return new TokenGeneratorStub();
};

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
  const tokenGeneratorStub = makeTokenGenerator();
  const updateAccessTokenRepositoryStub = makeUpdateAccessTokenRepository();

  const sut = new DbAuthentication(
    accountRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub
  );

  return {
    sut,
    accountRepositoryStub,
    hashComparerStub,
    tokenGeneratorStub,
    updateAccessTokenRepositoryStub,
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

  test('Should returns null if LoadAccountByEmailRepository returns null', async () => {
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

  test('Should returns null if HashComparer returns false', async () => {
    const { sut, hashComparerStub } = makeSut();

    jest
      .spyOn(hashComparerStub, 'compare')
      .mockReturnValueOnce(new Promise((resolve) => resolve(false)));

    const accessToken = await sut.auth(makeAuthentication());

    expect(accessToken).toBeNull();
  });

  test('Should call TokenGenerator with correct id', async () => {
    const { sut, tokenGeneratorStub } = makeSut();

    const generateSpy = jest.spyOn(tokenGeneratorStub, 'generate');

    await sut.auth(makeAuthentication());

    expect(generateSpy).toHaveBeenCalledWith('any_id');
  });

  test('Should throw if TokenGenerator throws', () => {
    const { sut, tokenGeneratorStub } = makeSut();

    jest.spyOn(tokenGeneratorStub, 'generate').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.auth(makeAuthentication());

    expect(promise).rejects.toThrow();
  });

  test('Should return a accessToken on success', async () => {
    const { sut } = makeSut();

    const accessToken = await sut.auth(makeAuthentication());

    expect(accessToken).toBe('any_token');
  });

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    const updateSpy = jest.spyOn(updateAccessTokenRepositoryStub, 'update');

    await sut.auth(makeAuthentication());

    expect(updateSpy).toHaveBeenCalledWith('any_id', 'any_token');
  });

  test('Should throw if UpdateAccessTokenRepository throws', () => {
    const { sut, updateAccessTokenRepositoryStub } = makeSut();

    jest
      .spyOn(updateAccessTokenRepositoryStub, 'update')
      .mockImplementationOnce(() => {
        throw new Error();
      });

    const promise = sut.auth(makeAuthentication());

    expect(promise).rejects.toThrow();
  });
});
