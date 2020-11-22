import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { validateRequest } from '../middlewares/validate-request';
import { BadRequestError } from '../errors/bad-request-error';
import { User } from '../models/user';
import { Password } from '../services/password';
import jwt from 'jsonwebtoken';
import { isConditionalExpression } from 'typescript';

const router = express.Router();

router.post(
  '/api/users/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('you must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid Credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      console.log(passwordsMatch);
      throw new BadRequestError('Invalid Credentials');
    }

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
      //exclamation tells typescript not to worry about this variable,
      //we already wrote a typeguard for it in index.ts
    );

    //store it on the session object
    // req.session.jwt = userJwt; => creates error with TS so declare again
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
