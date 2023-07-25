import { DbAddAccount } from '@/data/usecases';
import { BcryptAdapter } from '@/infra/cryptography';
import { AccountMongoRepository, LogMongoRepository } from '@/infra/db/mongodb';
import { LogControllerDecorator } from '@/main/decorators';
import { SignUpController } from '@/presentation/controllers';

import { makeSignUpValidation } from './signup-validation-factory';

export const makeSignUpController = () => {
  const SALT = 12;

  const dbAddAccount = new DbAddAccount(
    new BcryptAdapter(SALT),
    new AccountMongoRepository()
  );

  const signupController = new SignUpController(
    dbAddAccount,
    makeSignUpValidation()
  );

  return new LogControllerDecorator(signupController, new LogMongoRepository());
};
