import { MissingParamError } from '@/presentation/errors';

import { RequiredFieldsValidation } from './required-fields-validation';

describe('Required Fields Validation', () => {
  test('Should return a MissingParamError if validation fails', () => {
    const sut = new RequiredFieldsValidation(['any_field']);

    const error = sut.validate({ name: 'any_name' });

    expect(error).toEqual(new MissingParamError('any_field'));
  });
});
