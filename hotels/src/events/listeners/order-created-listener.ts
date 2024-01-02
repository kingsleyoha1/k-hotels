import { Message } from 'node-nats-streaming';
import { Listener, OrderCreatedEvent, Subjects } from '@kingsley555/common-module-k-hotels';
import { queueGroupName } from './queue-group-name';
import { Room } from '../../models/room';
import { RoomUpdatedPublisher } from '../publishers/room-updated-publisher';

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: Message) {
    // Find the room that the order is reserving
    const room = await Room.findById(data.room.id);

    // If no room, throw error
    if (!room) {
      throw new Error('Room not found');
    }

    // Mark the room as being reserved by setting its orderId property
    room.set({ orderId: data.id });

    // Save the room
    await room.save();
    await new RoomUpdatedPublisher(this.client).publish({
      id: room.id,
      price: room.price,
      title: room.title,
      userId: room.userId,
      orderId: room.orderId,
      version: room.version,
    });

    // ack the message
    msg.ack();
  }
}
