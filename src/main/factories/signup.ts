import { DbAddAccount } from '../../data/usecases';
import { BcryptAdapter } from '../../infra/cryptography';
import {
  AccountMongoRepository,
  LogMongoRepository,
} from '../../infra/db/mongodb';
import { SignUpController } from '../../presentation/controllers';
import { EmailValidatorAdapter } from '../../utils/adapters';
import { LogControllerDecorator } from '../decorators';

export const makeSignUpController = () => {
  const SALT = 12;

  const dbAddAccount = new DbAddAccount(
    new BcryptAdapter(SALT),
    new AccountMongoRepository()
  );

  const signupController = new SignUpController(
    new EmailValidatorAdapter(),
    dbAddAccount
  );

  return new LogControllerDecorator(signupController, new LogMongoRepository());
};
