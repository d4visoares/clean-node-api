import { DbAuthentication } from '@/data/usecases';
import { BcryptAdapter, JwtAdapter } from '@/infra/cryptography';
import { AccountMongoRepository, LogMongoRepository } from '@/infra/db/mongodb';
import { LogControllerDecorator } from '@/main/decorators';
import { LoginController } from '@/presentation/controllers';
import { JWT } from '@/utils/constants';

import { makeLoginValidation } from './login-validation-factory';

export const makeLoginController = () => {
  const SALT = 12;

  const accountRepository = new AccountMongoRepository();

  const dbAuthentication = new DbAuthentication(
    accountRepository,
    new BcryptAdapter(SALT),
    new JwtAdapter(JWT.SECRET),
    accountRepository
  );

  const loginController = new LoginController(
    makeLoginValidation(),
    dbAuthentication
  );

  return new LogControllerDecorator(loginController, new LogMongoRepository());
};
