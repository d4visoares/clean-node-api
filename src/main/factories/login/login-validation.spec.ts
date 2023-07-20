import {
  EmailValidation,
  EmailValidator,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation';

import { makeLoginValidation } from './login-validation';

jest.mock('@/presentation/utils/validators/validation-composite');

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid(email: string): boolean {
      return true;
    }
  }

  return new EmailValidatorStub();
};

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeLoginValidation();
    const emailValidator = makeEmailValidator();

    const requiredFields = ['email', 'password'];

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldsValidation(requiredFields),
      new EmailValidation(emailValidator, 'email'),
    ]);
  });
});
