import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { validateRequest, BadRequestError} from '@abemtickets/common'
import { User } from '../models/user';

const router = express.Router();

router.post(
  '/api/users/signup',
  //middleware
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage('Password must be between 4 and 20 characters'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError('Email in use');
    }
    const user = User.build({ email, password });
    await user.save();

    //generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
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

    res.status(201).send(user);
  }
);

export { router as signupRouter };
