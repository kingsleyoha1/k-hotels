import express, { Request, Response } from 'express';
import { Room } from '../../models/room';

const router = express.Router();

router.get('/api/hotels/room/:id', async (req: Request, res: Response) => {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.send(room);
  });

  export { router as getRoomRouter };
