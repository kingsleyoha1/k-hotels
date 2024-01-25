import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Hotel } from '../../models/hotel';
import { Room } from '../../models/room';
import { RoomCreatedPublisher } from '../../events/publishers/room-created-publisher';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { requireAuth, validateRequest, BadRequestError } from '@kingsley555/common-module-k-hotels';

const router = express.Router();

router.post(
    '/api/hotels/:hotelId/room',
    requireAuth,
    [
      body('title').not().isEmpty().withMessage('Room number is required'),
      body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
      // body('roomNumber').not().isEmpty().withMessage('Room number is required'),
      // body('type').not().isEmpty().withMessage('Room type is required'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const hotel = await Hotel.findById(req.params.hotelId);
      if (!hotel) {
        return res.status(404).send('Hotel not found');
      }
  
      const room = Room.build(req.body);
      await room.save();
      hotel?.room?.push(room);
      await hotel.save();  
      
        // Make sure RabbitMQ channel is available
    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }    

    // Create and use the RabbitMQ-based publisher
    const publisher = new RoomCreatedPublisher();
    await publisher.publish({
      id: room.id,
      title: room.title,
      price: room.price,
      userId: room.userId,
      version: room.version,
    });
      res.status(201).send(room);
    }
  );

  export { router as createNewRoomRouter };
