import express, { Request, Response } from 'express';
import { Rooms } from '../../models/hotel';
import { requireAuth, validateRequest } from '@k-hotels/common';

const router = express.Router();

router.delete('/api/rooms/:id', requireAuth, async (req: Request, res: Response) => {
    const room = await Rooms.findByIdAndDelete(req.params.id);
    if (!room) {
      return res.status(404).send('Room not found');
    }
    res.status(204).send();
  });

  export { router as deleteRoomRouter };
