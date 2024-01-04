import { ConsumeMessage } from 'amqplib';
import { Subjects, RoomCreatedEvent, Listener } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import {queueGroupName} from './queue-group-name'

export class RoomCreatedListener extends Listener<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;
  queueGroupName = 'room-create-orders-service';

  async onMessage(data: RoomCreatedEvent['data'], msg: ConsumeMessage) {
    const { id, title, price } = data;   
      
    const room = Room.build({
      id,
      title,
      price,
    });
    await room.save();
    this.channel.ack(msg);
  }
}
