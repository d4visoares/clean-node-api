import { Encrypter } from '@/data/protocols/cryptography';

import { DbAddAccount } from './db-add-account';

const makeEncrypter = () => {
  class EncrypterStub implements Encrypter {
    async encrypt(_: string): Promise<string> {
      return 'encrypted_password';
    }
  }

  return new EncrypterStub();
};

const makeSut = () => {
  const encrypterStub = makeEncrypter();
  const sut = new DbAddAccount(encrypterStub);

  return {
    sut,
    encrypterStub,
  };
};

describe('DbAddAccount Usecase', () => {
  test('Should call encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut();

    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt');

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@mail',
      password: 'valid_password',
    };

    await sut.add(accountData);

    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
