import { EmailValidatorAdapter } from '@/main/adapters';
import {
  EmailValidation,
  RequiredFieldsValidation,
  ValidationComposite,
} from '@/presentation';

export const makeLoginValidation = (): ValidationComposite => {
  const requiredFields = ['email', 'password'];

  return new ValidationComposite([
    new RequiredFieldsValidation(requiredFields),
    new EmailValidation(new EmailValidatorAdapter(), 'email'),
  ]);
};
