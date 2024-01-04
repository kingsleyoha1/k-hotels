import express, { Request, Response } from 'express';
import { requireAuth, validateRequest } from '@kingsley555/common-module-k-hotels';
import { Hotel } from '../../models/hotel';

const router = express.Router();

router.delete('/api/hotels/:id', requireAuth, async (req: Request, res: Response) => {
    const hotel = await Hotel.findByIdAndDelete(req.params.id);
    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }
    res.status(204).send();
  });
  export { router as deleteHotelRouter };
