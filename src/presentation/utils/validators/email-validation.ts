import { InvalidParamError } from '@/presentation/errors';
import { EmailValidator, Validation } from '@/presentation/protocols';

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
