// import mongoose from 'mongoose';
// import { Message } from 'node-nats-streaming';
// import { OrderCancelledEvent } from '@kingsley555/common-module-k-hotels';
// import { natsWrapper } from '../../../nats-wrapper';
// import { OrderCancelledListener } from '../order-cancelled-listener';
// import { Room } from '../../../models/room';

// const setup = async () => {
//   const listener = new OrderCancelledListener(natsWrapper.client);

//   const orderId = new mongoose.Types.ObjectId().toHexString();
//   const room = Room.build({
//     title: 'room one',
//     price: 45,
//     userId: 'asdf',
//     // roomNumber: 21,
//     // type: 'double suite',
//     // amenities: ['games']
//   });
//   room.set({ orderId });
//   await room.save();

//   const data: OrderCancelledEvent['data'] = {
//     id: orderId,
//     version: 0,
//     room: {
//       id: room.id,
//     },
//   };

//   // @ts-ignore
//   const msg: Message = {
//     ack: jest.fn(),
//   };

//   return { msg, data, room, orderId, listener };
// };

// it('updates the roo, publishes an event, and acks the message', async () => {
//   const { msg, data, room, orderId, listener } = await setup();

//   await listener.onMessage(data, msg);

//   const updatedRoom = await Room.findById(room.id);
//   expect(updatedRoom!.orderId).not.toBeDefined();
//   expect(msg.ack).toHaveBeenCalled();
//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
