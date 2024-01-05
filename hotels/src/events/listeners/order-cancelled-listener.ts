import { ConsumeMessage } from 'amqplib';
import { Listener, OrderCancelledEvent, Subjects } from '@kingsley555/common-module-k-hotels';
import { queueGroupName } from './queue-group-name';
import { Room } from '../../models/room';
import { RoomUpdatedPublisher } from '../publishers/room-updated-publisher';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent['data'], msg: ConsumeMessage) {
    const room = await Room.findById(data.room.id);

    if (!room) {
      throw new Error('Room not found');
    }

    room.set({ orderId: undefined });
    await room.save();

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }

    const publisher = new RoomUpdatedPublisher();
    await publisher.publish({
      id: room.id,
      price: room.price,
      title: room.title,
      userId: room.userId,
      orderId: room.orderId,
      version: room.version,
    });

    this.channel.ack(msg);
  }
}
