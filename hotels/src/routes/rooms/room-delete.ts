import express, { Request, Response } from 'express';
import { Room } from '../../models/room';
import { requireAuth, validateRequest } from '@kingsley555/common-module-k-hotels';

const router = express.Router();

router.delete('/api/hotels/room/:id', requireAuth, async (req: Request, res: Response) => {
    const room = await Room.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.status(204).send();
  });

  export { router as deleteRoomRouter };
