import { HashComparer, TokenGenerator } from '@/data/protocols/cryptography';
import { LoadAccountByEmailRepository } from '@/data/protocols/db';
import { Authentication, AuthenticationModel } from '@/domain/usecases';

export class DbAuthentication implements Authentication {
  constructor(
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator
  ) {}

  async auth(authentication: AuthenticationModel): Promise<string | null> {
    const account = await this.loadAccountByEmailRepository.loadByEmail(
      authentication.email
    );

    if (!account) return null;

    await this.hashComparer.compare(authentication.password, account.password);
    await this.tokenGenerator.generate(account.id);

    return null;
  }
}
