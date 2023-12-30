import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { requireAuth, validateRequest } from '@k-hotels/common';
import { Hotels } from '../../models/hotel';

const router = express.Router();

router.delete('/api/hotels/:id', requireAuth, async (req: Request, res: Response) => {
    const hotel = await Hotels.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }
    res.status(204).send();
  });
  export { router as deleteHotelRouter };
