import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Hotels, Rooms } from '../../models/hotel';
import { requireAuth, validateRequest } from '@k-hotels/common';

const router = express.Router();

router.post(
    '/api/hotels/:hotelId/rooms',
    requireAuth,
    [
      body('roomNumber').not().isEmpty().withMessage('Room number is required'),
      body('type').not().isEmpty().withMessage('Room type is required'),
      body('pricePerNight').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const hotel = await Hotels.findById(req.params.hotelId);
      if (!hotel) {
        return res.status(404).send('Hotel not found');
      }
  
      const room = Rooms.build(req.body);
      await room.save();
      hotel?.rooms?.push(room);
      await hotel.save();
  
      res.status(201).send(room);
    }
  );

  export { router as createNewRoomRouter };
