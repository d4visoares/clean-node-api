import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwt-adapter';

interface SignTypes {
  id: number;
}

jest.mock('jsonwebtoken', () => ({
  async sign({ id }: SignTypes, secret: string) {
    return 'any_token';
  },
}));

describe('Jwt Adapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = new JwtAdapter('secret');

    const signSpy = jest.spyOn(jwt, 'sign');

    await sut.encrypt('any_id');

    expect(signSpy).toHaveBeenCalledWith({ id: 'any_id' }, 'secret');
  });
});
