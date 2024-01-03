import { Message } from 'node-nats-streaming';
import { Subjects, Listener, RoomUpdatedEvent } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import { queueGroupName } from './queue-group-name';

export class RoomUpdatedListener extends Listener<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;
  queueGroupName = queueGroupName;

  async onMessage(data: RoomUpdatedEvent['data'], msg: Message) {
    const room = await Room.findByEvent(data);

    if (!room) {
      throw new Error('Room not found');
    }

    const {title, price } = data;
    room.set({title, price });
    await room.save();

    msg.ack();
  }
}
