import express, { Request, Response } from 'express';
import { NotFoundError } from '@kingsley555/common-module-k-hotels';

import { Hotel } from '../../models/hotel';


const router = express.Router();

router.get('/api/hotels/:id', async (req: Request, res: Response) => {
    const hotel = await Hotel.findById(req.params.id).populate('room');
    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }
    res.send(hotel);
  });
  
  export { router as getHotelRouter };
