import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation';
import { EmailValidatorAdapter } from '@/utils/adapters';

export const makeLoginValidation = (): ValidationComposite => {
  const requiredFields = ['email', 'password'];

  return new ValidationComposite([
    new RequiredFieldsValidation(requiredFields),
    new EmailValidation(new EmailValidatorAdapter(), 'email'),
  ]);
};
