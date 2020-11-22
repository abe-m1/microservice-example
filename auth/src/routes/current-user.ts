import express from 'express';
import { currentUser } from '../middlewares/current-user';

const router = express.Router();

router.get('/api/users/currentuser', currentUser, (req, res) => {
  //coming from middleware
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
