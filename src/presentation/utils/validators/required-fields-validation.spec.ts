import { MissingParamError } from '@/presentation/errors';

import { RequiredFieldsValidation } from './required-fields-validation';

const makeSut = (): RequiredFieldsValidation =>
  new RequiredFieldsValidation(['any_field']);

describe('Required Fields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = makeSut();

    const error = sut.validate({ name: 'any_name' });

    expect(error).toEqual(new MissingParamError('any_field'));
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();

    const error = sut.validate({ any_field: 'any_value' });

    expect(error).toBeFalsy();
  });
});
