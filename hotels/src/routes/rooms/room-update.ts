import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { Room } from '../../models/room';
import {  validateRequest,
  NotFoundError,
  requireAuth,
  NotAuthorizedError,
  BadRequestError, } from '@kingsley555/common-module-k-hotels';
  import { RoomUpdatedPublisher } from '../../events/publishers/room-updated-publisher';

const router = express.Router();

router.put(
    '/api/hotels/room/:id',
    requireAuth,
    [
      body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const room = await Room.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!room) {
        throw new NotFoundError();
      }
      if (room.orderId) {
      throw new BadRequestError('Cannot edit a reserved ticket');
    }

      if (room.userId !== req.currentUser!.id) {
      throw new NotAuthorizedError();
    }
      
       room.set({
      title: req.body.title,
      price: req.body.price,
    });
    await room.save();

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }    
    const publisher = new RoomUpdatedPublisher();
      await publisher.publish({
        id: room.id,
        title: room.title,
        price: room.price,
        userId: room.userId,
        version: room.version,
      });

    res.send(room);
    }
  );

  export { router as updateRoomRouter };
