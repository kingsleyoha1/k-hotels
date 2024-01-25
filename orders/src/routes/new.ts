import mongoose from 'mongoose';
import express, { Request, Response } from 'express';
import {
  requireAuth,
  validateRequest,
  NotFoundError,
  OrderStatus,
  BadRequestError,
} from '@kingsley555/common-module-k-hotels';
import { body } from 'express-validator';
import { Room } from '../models/room';
import { Order } from '../models/order';
import { OrderCreatedPublisher } from '../events/publishers/order-created-publisher';
import { rabbitMQWrapper } from '../rabbitmq-wrapper';


const router = express.Router();

const EXPIRATION_WINDOW_SECONDS = 10 * 60;

router.post(
  '/api/orders',
  requireAuth,
  [
    body('roomId')
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage('RoomId must be provided'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    
    const { roomId } = req.body;

    // Find the room the user is trying to order in the database
    const room = await Room.findById(roomId);
    if (!room) {
      throw new NotFoundError();
    }

    // Make sure that this room is not already reserved
    const isReserved = await room.isReserved();
    if (isReserved) {
      throw new BadRequestError('Room is already reserved');
    }

    // Calculate an expiration date for this order
    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build the order and save it to the database
    const order = Order.build({
      userId: req.currentUser!.id,
      status: OrderStatus.Created,
      expiresAt: expiration,
      room,
    });
    await order.save();

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    } 
    const publisher = new OrderCreatedPublisher();
    await publisher.publish({
      id: order.id,
      version: order.version,
      status: order.status,
      userId: order.userId,
      expiresAt: order.expiresAt.toISOString(),
      room: {
        id: room.id,
        price: room.price,
      },
    });

    res.status(201).send(order);
  }
);

export { router as newOrderRouter };
