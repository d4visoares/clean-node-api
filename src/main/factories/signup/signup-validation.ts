import {
  CompareFieldsValidation,
  RequiredFieldsValidation,
} from '@/presentation';
import { ValidationComposite } from '@/presentation/utils/validators/validation-composite';

export const makeSignUpValidation = () => {
  const requiredFields = ['name', 'email', 'password', 'passwordConfirmation'];

  return new ValidationComposite([
    new RequiredFieldsValidation(requiredFields),
    new CompareFieldsValidation('password', 'passwordConfirmation'),
  ]);
};
