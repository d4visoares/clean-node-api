import validator from 'validator';
import isEmail from 'validator/lib/isEmail';

import { EmailValidatorAdapter } from './email-validator';

jest.mock('validator', () => ({
  isEmail(): boolean {
    return true;
  },
}));

describe('EmailValidator Adapter', () => {
  test('should return false if the validator returns false', () => {
    const sut = new EmailValidatorAdapter();

    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const isValid = sut.isValid('invalid_email@mail.com');

    expect(isValid).toBe(false);
  });

  test('should return true if the validator returns true', () => {
    const sut = new EmailValidatorAdapter();
    const isValid = sut.isValid('valid_email@mail.com');

    expect(isValid).toBe(true);
  });
});
