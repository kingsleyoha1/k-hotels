import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@kingsley555/common-module-k-hotels';
import { Hotel } from '../../models/hotel';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.put(
    '/api/hotels/:id',
    requireAuth,
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('location').not().isEmpty().withMessage('Location is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!hotel) {
        return res.status(404).send('Hotel not found');
      }
      res.send(hotel);
    }
  );

  export { router as updateHotelRouter };

  