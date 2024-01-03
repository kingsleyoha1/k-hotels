import { ConsumeMessage } from 'amqplib';
import { Subjects, RoomUpdatedEvent } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import { Listener } from '../base-listerner';


export class RoomUpdatedListen extends Listener<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;
  queueGroupName = 'room-service-update-queue-group'; // Use a specific queue group name

  async onMessage(data: RoomUpdatedEvent['data'], msg: ConsumeMessage) {
    const room = await Room.findByEvent(data);

    if (!room) {
      throw new Error('Room not found');
    }

    const {title, price } = data;
    room.set({title, price });
    await room.save();

    // Acknowledge the message
    this.channel.ack(msg);
  }
}
