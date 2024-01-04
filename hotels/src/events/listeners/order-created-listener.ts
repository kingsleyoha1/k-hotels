import { ConsumeMessage } from 'amqplib';
import { Listener, OrderCreatedEvent, Subjects } from '@kingsley555/common-module-k-hotels';
import { queueGroupName } from './queue-group-name';
import { Room } from '../../models/room';
import { RoomUpdatedPublisher } from '../publishers/room-updated-publisher';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper'; // Adjust the import path

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: ConsumeMessage) {
    const room = await Room.findById(data.room.id);    

    if (!room) {
      throw new Error('Room not found');
    }
    room.set({ orderId: data.id });

    await room.save();
    
    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }

    const publisher = new RoomUpdatedPublisher();
    await publisher.publish({
      id: room.id,
      title: room.title,
      price: room.price,
      userId: room.userId,
      version: room.version,
      orderId: room.orderId
    });
    this.channel.ack(msg);
  }
}
