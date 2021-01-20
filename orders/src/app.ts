import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@abemtickets/common'
import { newOrderRouter } from './routes/new';
import { showOrderRouter } from './routes/show';
import { indexOrderRouter } from './routes/index';
import { deleteOrderRouter } from './routes/delete';

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
app.use(currentUser);
app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);




app.all('*', async (req, res, next) => {
  //using express-async-errors
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
