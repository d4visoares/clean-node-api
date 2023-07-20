import { InvalidParamError } from '@/presentation/errors';

import { CompareFieldsValidation } from './compare-fields-validation';

const makeSut = (): CompareFieldsValidation =>
  new CompareFieldsValidation('field', 'fieldToCompare');

describe('Compare Fields Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut();

    const error = sut.validate({
      field: 'value',
      fieldToCompare: 'other_value',
    });

    expect(error).toEqual(new InvalidParamError('fieldToCompare'));
  });

  test('Should not return if validation succeeds', () => {
    const sut = makeSut();

    const error = sut.validate({
      field: 'value',
      fieldToCompare: 'value',
    });

    expect(error).toBeFalsy();
  });
});
