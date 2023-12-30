import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Hotels, Rooms } from '../../models/hotel';
import { requireAuth, validateRequest } from '@k-hotels/common';

const router = express.Router();

router.put(
    '/api/rooms/:id',
    requireAuth,
    [
      body('type').not().isEmpty().withMessage('Type is required'),
      body('pricePerNight').isFloat({ gt: 0 }).withMessage('Price must be greater than 0')
    ],
    validateRequest,
    async (req: Request, res: Response) => {
      const room = await Rooms.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!room) {
        return res.status(404).send('Room not found');
      }
      res.send(room);
    }
  );

  export { router as updateRoomRouter };
