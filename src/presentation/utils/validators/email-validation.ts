import { InvalidParamError } from '@/presentation/errors';
import { EmailValidator } from '@/presentation/protocols';

import { Validation } from './validation';

export class EmailValidation implements Validation {
  constructor(
    private readonly emailValidator: EmailValidator,
    private readonly fieldName: string
  ) {}

  validate(data: any): Error | undefined {
    const isValid = this.emailValidator.isValid(data[this.fieldName]);

    if (!isValid) return new InvalidParamError(this.fieldName);
  }
}
