import { Listener, OrderCancelledEvent, Subjects } from '@kingsley555/common-module-k-hotels';
import { Message } from 'node-nats-streaming';
import { queueGroupName } from './queue-group-name';
import { Room } from '../../models/room';
import { RoomUpdatedPublisher } from '../publishers/room-updated-publisher';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: Message) {
    const room = await Room.findById(data.room.id);

    if (!room) {
      throw new Error('Room not found');
    }

    room.set({ orderId: undefined });
    await room.save();
    await new RoomUpdatedPublisher(this.client).publish({
      id: room.id,
      orderId: room.orderId,
      userId: room.userId,
      price: room.price,
      title: room.title,
      version: room.version,
    });

    msg.ack();
  }
}
