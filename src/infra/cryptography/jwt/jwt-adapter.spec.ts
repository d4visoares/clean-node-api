import jwt from 'jsonwebtoken';

import { JwtAdapter } from './jwt-adapter';

jest.mock('jsonwebtoken', () => ({
  async sign() {
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

  test('Should a token on sign success', async () => {
    const sut = new JwtAdapter('secret');

    const accessToken = await sut.encrypt('any_id');

    expect(accessToken).toBe('any_token');
  });
});