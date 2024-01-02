import express, { Request, Response } from 'express';
import { Room } from '../../models/room';

const router = express.Router();

router.get('/api/hotels/rooms', async (req: Request, res: Response) => {
  const room = await Room.find({
    orderId: undefined,
  });

    res.send(room);
  });

  export { router as getRoomsRouter };
