import express, { Request, Response } from 'express';
import { Room } from '../../models/room';
import { Hotel } from '../../models/hotel';

const router = express.Router();


router.get('/api/hotels/:hotelId/rooms', async (req: Request, res: Response) => {
  const hotelId = req.params.hotelId;

  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    return res.status(404).send('Hotel not found');
  }


  const rooms = await Room.find({ hotelId: hotelId, orderId: undefined });

  res.send(rooms);
});

export { router as getRoomsRouter };
