import express, { Request, Response } from 'express';
import {
  requireAuth,
  NotFoundError,
  NotAuthorizedError,
} from '@kingsley555/common-module-k-hotels';
import { Order, OrderStatus } from '../models/order';
import { OrderCancelledPublisher } from '../events/publishers/order-cancelled-publisher';
import { rabbitMQWrapper } from '../rabbitmq-wrapper';

const router = express.Router();

router.delete(
  '/api/orders/:orderId',
  requireAuth,
  async (req: Request, res: Response) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId).populate('room');

    if (!order) {
      throw new NotFoundError();
    }
    if (order.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
    order.status = OrderStatus.Cancelled;
    await order.save();

    // publishing an event saying this was cancelled!


    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    } 
    const publisher = new OrderCancelledPublisher();
    await publisher.publish({
      id: order.id,
      version: order.version,
      room: {
        id: order.room.id,
      },
    });

    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
