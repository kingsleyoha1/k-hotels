import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import { Hotels, Rooms } from '../../models/hotel';
import { requireAuth, validateRequest } from '@k-hotels/common';

const router = express.Router();

router.post('/api/hotels/rooms/:roomId/book', async (req: Request, res: Response) => {
    const { roomId } = req.params;
    const userId = req.currentUser!.id; // Assuming you have the user's ID
  
    try {
      // Check if the room is already booked
      const existingRoom = await Rooms.findById(roomId);
      if (!existingRoom) {
        return res.status(404).send({ error: 'Room not found' });
      }
  
      if (existingRoom.isBooked) {
        return res.status(400).send({ error: 'Room is already booked' });
      }
  
      existingRoom.isBooked = true;
      existingRoom.bookedByUserId = userId;
      await existingRoom.save();
  
      res.status(200).send(existingRoom);
    } catch (error) {
      res.status(500).send({ error: 'Internal Server Error' });
    }
  });
  

export { router as bookingRouter };
