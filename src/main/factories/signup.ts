import { DbAddAccount } from '../../data/usecases';
import { BcryptAdapter } from '../../infra/cryptography';
import { AccountMongoRepository } from '../../infra/db/mongodb';
import { SignUpController } from '../../presentation/controllers';
import { EmailValidatorAdapter } from '../../utils/adapters';

export const makeSignUpController = () => {
  const SALT = 12;

  const dbAddAccount = new DbAddAccount(
    new BcryptAdapter(SALT),
    new AccountMongoRepository()
  );

  return new SignUpController(new EmailValidatorAdapter(), dbAddAccount);
};
