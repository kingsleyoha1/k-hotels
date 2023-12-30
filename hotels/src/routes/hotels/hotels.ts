import express, { Request, Response } from 'express';
import { Hotels } from '../../models/hotel';


const router = express.Router();

router.get('/api/hotels', async (req: Request, res: Response) => {
  const hotels = await Hotels.find().populate('rooms');
  res.send(hotels);
});


  export { router as getAllHotels };
