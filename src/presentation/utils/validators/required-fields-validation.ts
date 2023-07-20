import { MissingParamError } from '@/presentation/errors';
import { Validation } from '@/presentation/protocols';

export class RequiredFieldsValidation implements Validation {
  constructor(private readonly fieldNames: string[]) {}

  validate(data: any): Error | undefined {
    for (const fieldName of this.fieldNames) {
      if (!data[fieldName]) return new MissingParamError(fieldName);
    }
  }
}
