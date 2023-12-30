import express, { Request, Response } from 'express';
import { NotFoundError } from '@k-hotels/common';

import { Hotels } from '../../models/hotel';


const router = express.Router();

router.get('/api/hotels/:id', async (req: Request, res: Response) => {
    const hotel = await Hotels.findById(req.params.id).populate('rooms');
    if (!hotel) {
      return res.status(404).send('Hotel not found');
    }
    res.send(hotel);
  });
  
  export { router as getHotelRouter };
