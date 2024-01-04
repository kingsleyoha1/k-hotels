// import { ConsumeMessage } from 'amqplib';
// import {
//   Subjects,
//   Listener,
//   PaymentCreatedEvent,
//   OrderStatus,
// } from '@kingsley555/common-module-k-hotels';
// import { queueGroupName } from './queue-group-name';
// import { Order } from '../../models/order';

// export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
//   subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
//   queueGroupName = queueGroupName;

//   async onMessage(data: PaymentCreatedEvent['data'], msg: ConsumeMessage) {
//     const order = await Order.findById(data.orderId);

//     if (!order) {
//       throw new Error('Order not found');
//     }

//     order.set({ status: OrderStatus.Complete });
//     await order.save();

//     this.channel.ack(msg);
//   }
// }
