import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@k-hotels/common';
import { Hotels } from '../../models/hotel';
import { natsWrapper } from '../../nats-wrapper';

const router = express.Router();

router.post(
    '/api/hotels',
    requireAuth,
    [
      body('name').not().isEmpty().withMessage('Name is required'),
      body('location').not().isEmpty().withMessage('Location is required')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const { name, location } = req.body;
      
      const hotel = Hotels.build({ name, location, userId: req.currentUser!.id });
      await hotel.save();
  
      res.status(201).send(hotel);
    }
  );

export { router as createHotelRouter };
