import {
  CompareFieldsValidation,
  EmailValidation,
  EmailValidator,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation';

import { makeSignUpValidation } from './signup-validation-factory';

jest.mock('@/presentation/utils/validators/validation-composite');

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('SingUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation();

    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];

    const emailValidator = makeEmailValidator();

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldsValidation(requiredFields),
      new CompareFieldsValidation('password', 'passwordConfirmation'),
      new EmailValidation(emailValidator, 'email'),
    ]);
  });
});
