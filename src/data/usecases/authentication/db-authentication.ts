import { HashComparer, TokenGenerator } from '@/data/protocols/cryptography';
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
} from '@/data/protocols/db';
import { Authentication, AuthenticationModel } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );

    if (!account) return null;

    const passwordIsValid = await this.hashComparer.compare(
      authentication.password,
      account.password
    );

    if (!passwordIsValid) return null;

    const accessToken = await this.tokenGenerator.generate(account.id);

    await this.updateAccessTokenRepository.update(account.id, accessToken);

    return accessToken;
  }
}
