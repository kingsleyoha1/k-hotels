import express, { Request, Response } from 'express';
import { requireAuth } from '@kingsley555/common-module-k-hotels';
import { Order } from '../models/order';

const router = express.Router();

router.get('/api/orders', requireAuth, async (req: Request, res: Response) => {
  const orders = await Order.find({
    userId: req.currentUser!.id,
  }).populate('room');

  res.send(orders);
});

export { router as indexOrderRouter };
