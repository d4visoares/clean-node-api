import { RequiredFieldsValidation, ValidationComposite } from '@/presentation';

import { makeSignUpValidation } from './signup-validation';

jest.mock('@/presentation/utils/validators/validation-composite');

describe('SingUpValidation Factory', () => {
  test('Should call ValidationComposite with all validation', () => {
    makeSignUpValidation();

    const requiredFields = [
      'name',
      'email',
      'password',
      'passwordConfirmation',
    ];

    expect(ValidationComposite).toHaveBeenCalledWith([
      new RequiredFieldsValidation(requiredFields),
    ]);
  });
});
