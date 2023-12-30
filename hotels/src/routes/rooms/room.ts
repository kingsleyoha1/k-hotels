import express, { Request, Response } from 'express';
import { Rooms } from '../../models/hotel';

const router = express.Router();

router.get('/api/rooms/:id', async (req: Request, res: Response) => {
    const room = await Rooms.findById(req.params.id);
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.send(room);
  });

  export { router as getRoomRouter };
