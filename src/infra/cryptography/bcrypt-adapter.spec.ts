import bcrypt from 'bcrypt';

import { BcryptAdapter } from './bcrypt-adapter';

jest.mock('bcrypt', () => ({
  async hash() {
    return new Promise((resolve) => resolve('hash'));
  },

  async compare() {
    return new Promise((resolve) => resolve(true));
  },
}));

const salt = 12;

const makeSut = () => new BcryptAdapter(salt);

describe('Bcrypt Adapter', () => {
  test('Should call hasher with correct values', () => {
    const sut = makeSut();

    const hashSpy = jest.spyOn(bcrypt, 'hash');

    sut.hash('any_value');

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt);
  });

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut();

    const hash = await sut.hash('any_value');

    expect(hash).toBe('hash');
  });

  test('Should call compare with correct values', () => {
    const sut = makeSut();

    const compareSpy = jest.spyOn(bcrypt, 'compare');

    sut.compare('any_value', 'any_hash');

    expect(compareSpy).toHaveBeenCalledWith('any_value', 'any_hash');
  });

  test('Should throw if bcrypt throws', async () => {
    const sut = makeSut();

    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error();
    });

    const promise = sut.hash('any_value');

    expect(promise).rejects.toThrow();
  });
});
