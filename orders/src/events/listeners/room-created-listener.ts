import { Message } from 'node-nats-streaming';
import { Subjects, Listener, RoomCreatedEvent } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import { queueGroupName } from './queue-group-name';

export class RoomCreatedListener extends Listener<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: RoomCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const room = Room.build({
      id,
      title,
      price,
    });
    await room.save();

    msg.ack();
  }
}
