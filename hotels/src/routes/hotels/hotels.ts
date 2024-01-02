import express, { Request, Response } from 'express';
import { Hotel } from '../../models/hotel';


const router = express.Router();

router.get('/api/hotels', async (req: Request, res: Response) => {
  const hotels = await Hotel.find().populate('room');
  res.send(hotels);
});


  export { router as getAllHotels };
