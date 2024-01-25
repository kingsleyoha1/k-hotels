
import { ConsumeMessage } from 'amqplib';
import { Listener, OrderCreatedEvent, Subjects } from '@kingsley555/common-module-k-hotels';
import { queueGroupName } from './queue-group-name';
import { Order } from '../../models/order';


export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCreatedEvent['data'], msg: ConsumeMessage) {
    const order = Order.build({
      id: data.id,
      price: data.room.price,
      status: data.status,
      userId: data.userId,
      version: data.version,
    });
    await order.save();

    this.channel.ack(msg);
  }
}
