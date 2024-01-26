import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Hotel } from '../../models/hotel';
import { Room } from '../../models/room';
import { RoomCreatedPublisher } from '../../events/publishers/room-created-publisher';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { requireAuth, validateRequest, BadRequestError } from '@kingsley555/common-module-k-hotels';
import Cloudinary  from '../../ultils/cloudinary';

const router = express.Router();

router.post(
    '/api/hotels/:hotelId/room',
    requireAuth,
    [
      body('title').not().isEmpty().withMessage('Room number is required'),
      body('price').isFloat({ gt: 0 }).withMessage('Price must be greater than 0'),
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { hotelId } = req.params;
      const hotel = await Hotel.findById(req.params.hotelId);
      if (!hotel) {
        return res.status(404).send('Hotel not found');
      }

      const { title, price, image } = req.body;
      let imageUrl;

      if (image) {
        const uploadedResponse = await Cloudinary.uploader.upload(image, {
          upload_preset: "kHotels",
        });
        imageUrl = uploadedResponse.url;
      }

      const room = Room.build({
        title,
        price,
        userId: req.currentUser!.id,
        hotelId, 
        image: imageUrl, 
      });
      await room.save();
      hotel?.room?.push(room);
      await hotel.save();  
   
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
