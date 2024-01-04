import { ConsumeMessage } from 'amqplib';
import { Subjects, RoomUpdatedEvent,Listener } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import {queueGroupName}  from './queue-group-name'


export class RoomUpdatedListener extends Listener<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;
  queueGroupName = 'room-update-orders-service';

  async onMessage(data: RoomUpdatedEvent['data'], msg: ConsumeMessage) {
    const room = await Room.findByEvent(data)
    
    if (!room) {
      throw new Error('Room not found');
    }

    
    const {title, price , orderId} = data;
    room.set({title, price, orderId });
    await room.save();

    this.channel.ack(msg);
  }
}
