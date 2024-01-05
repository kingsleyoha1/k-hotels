import { ConsumeMessage } from 'amqplib';
import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
  OrderStatus,
} from '@kingsley555/common-module-k-hotels';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';
import { OrderCancelledPublisher } from '../publishers/order-cancelled-publisher';
import { rabbitMQWrapper } from '../../rabbitmq-wrapper'; // Adjust the import path

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  queueGroupName = 'expiration-orders-service';
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  async onMessage(data: ExpirationCompleteEvent['data'], msg: ConsumeMessage) {
    const order = await Order.findById(data.orderId).populate('room');

    if (!order) {
      throw new Error('Order not found');
    }
    if (order.status === OrderStatus.Complete) {
      return this.channel.ack(msg);
    }

    order.set({ status: OrderStatus.Cancelled });
    await order.save();

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    } 

    const publisher = new OrderCancelledPublisher();
    await publisher.publish({
      id: order.id,
      version: order.version,
      room: {
        id: order.room.id,
      },
    });

    this.channel.ack(msg);
  }
}
