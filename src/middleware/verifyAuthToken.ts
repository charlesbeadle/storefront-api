import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export const verifyAuthToken = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const { TOKEN_SECRET: secret } = process.env;
	try {
		const authorizationHeader = req.headers.authorization;

		if (!authorizationHeader) {
			res.status(401);
			res.json({ message: 'Unauthorized' });
			return;
		}

		const token = authorizationHeader.split(' ')[1];
		jwt.verify(token, secret as string);
		next();
	} catch (err) {
		res.status(401);
		res.json({ message: 'Unauthorized' });
	}
};
