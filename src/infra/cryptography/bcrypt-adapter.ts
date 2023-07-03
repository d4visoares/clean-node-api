import { Encrypter } from '@/data/protocols/cryptography';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Encrypter {
  constructor(private readonly salt: number) {}

  async encrypt(value: string): Promise<string> {
    const encryptedValue = await bcrypt.hash(value, this.salt);

    return encryptedValue;
  }
}
