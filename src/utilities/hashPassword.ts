import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const { BCRYPT_PASS, SALT_ROUNDS } = process.env;

export const hashPassword = (pass: string): string => {
	const hash = bcrypt.hashSync(
		pass + BCRYPT_PASS,
		parseInt(SALT_ROUNDS as string)
	);
	return hash;
};
