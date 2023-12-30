import express, { Request, Response } from 'express';
import { Rooms } from '../../models/hotel';

const router = express.Router();

router.get('/api/rooms', async (req: Request, res: Response) => {
    const rooms = await Rooms.find();
    res.send(rooms);
  });

  export { router as getRoomsRouter };
