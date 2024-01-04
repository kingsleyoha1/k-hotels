// import { Message } from 'node-nats-streaming';
// import mongoose from 'mongoose';
// import { OrderCreatedEvent, OrderStatus } from '@kingsley555/common-module-k-hotels';
// import { OrderCreatedListener } from '../order-created-listener';
// import { natsWrapper } from '../../../nats-wrapper';
// import { Room } from '../../../models/room';

// const setup = async () => {
//   // Create an instance of the listener
//   const listener = new OrderCreatedListener(natsWrapper.client);

//   // Create and save a room
//   const room = Room.build({
//     title: 'room one',
//     price: 99,
//     userId: 'asdf',
//     // roomNumber: 45,
//     // type: 'double suite',
//     // amenities: ['games']

//   });
//   await room.save();

//   // Create the fake data event
//   const data: OrderCreatedEvent['data'] = {
//     id: new mongoose.Types.ObjectId().toHexString(),
//     version: 0,
//     status: OrderStatus.Created,
//     userId: 'alskdfj',
//     expiresAt: 'alskdjf',
//     room: {
//       id: room.id,
//       price: room.price,
//     },
//   };

//   // @ts-ignore
//   const msg: Message = {
//     ack: jest.fn(),
//   };

//   return { listener, room, data, msg };
// };

// it('sets the userId of the room', async () => {
//   const { listener, room, data, msg } = await setup();

//   await listener.onMessage(data, msg);

//   const updatedRoom = await Room.findById(room.id);

//   expect(updatedRoom!.orderId).toEqual(data.id);
// });

// it('acks the message', async () => {
//   const { listener, room, data, msg } = await setup();
//   await listener.onMessage(data, msg);

//   expect(msg.ack).toHaveBeenCalled();
// });

// it('publishes a room updated event', async () => {
//   const { listener, room, data, msg } = await setup();

//   await listener.onMessage(data, msg);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();

//   const roomUpdatedData = JSON.parse(
//     (natsWrapper.client.publish as jest.Mock).mock.calls[0][1]
//   );

//   expect(data.id).toEqual(roomUpdatedData.orderId);
// });
