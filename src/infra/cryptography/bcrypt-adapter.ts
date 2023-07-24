import { HashComparer, Hasher } from '@/data/protocols/cryptography';
import bcrypt from 'bcrypt';

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}
  async compare(value: string, hash: string): Promise<boolean> {
    await bcrypt.compare(value, hash);

    return true;
  }

  async hash(value: string): Promise<string> {
    const hashedValue = await bcrypt.hash(value, this.salt);

    return hashedValue;
  }
}
