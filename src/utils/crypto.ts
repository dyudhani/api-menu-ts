import * as bcrypt from 'bcryptjs';

const SALT_ROUNDS = 10;

export async function encryptPassword(password: string): Promise<string> {
  const salt: string = await bcrypt.genSalt(SALT_ROUNDS);
  const encrypt: string = await bcrypt.hash(password, salt);

  return encrypt;
}

export async function comparePlainAndEncrypt(
  plain: string,
  encrypt: string,
): Promise<boolean> {
  const isMatch = await bcrypt.compare(plain, encrypt);

  return isMatch;
}
