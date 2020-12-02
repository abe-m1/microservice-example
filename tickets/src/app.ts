import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';

import { errorHandler, NotFoundError, currentUser } from '@abemtickets/common'
import { createTicketRouter } from './routes/new';
import { showTicketRouter } from './routes/show';
import { indexTicketRouter } from './routes/index';
import { updateTicketRouter } from './routes/update';

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
app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);
app.use(updateTicketRouter);




app.all('*', async (req, res, next) => {
  //using express-async-errors
  throw new NotFoundError();
});
app.use(errorHandler);

export { app };
