import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signupRouter } from './routes/signup';
import { signoutRouter } from './routes/signout';
import { errorHandler } from './middlewares/error-handler';
import { NotFoundError } from './errors/not-found-error';

const app = express();
//traffic is being proxied to the application through ingress-nginx
app.set('trust proxy', true);

app.use(json());
app.use(
  cookieSession({
    //don't need to sign, because using JWT
    signed: false,
    //need condition below, so that we will be able to write tests with jest
    //if in test mode, secure will be false
    secure: process.env.NODE_ENV !== 'test'
  })
);

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signupRouter);
app.use(signoutRouter);

app.all('*', async (req, res, next) => {
  //using express-async-errors
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
