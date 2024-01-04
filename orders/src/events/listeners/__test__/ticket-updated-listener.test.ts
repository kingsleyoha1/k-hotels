// import mongoose from 'mongoose';
// import { Message } from 'node-nats-streaming';
// import { RoomUpdatedEvent } from '@kingsley555/common-module-k-hotels';
// import { RoomUpdatedListener } from '../room-updated-listener';
// import { natsWrapper } from '../../../nats-wrapper';
// import { Room } from '../../../models/room';

// const setup = async () => {
//   // Create a listener
//   const listener = new RoomUpdatedListener(natsWrapper.client);

//   // Create and save a room
//   const room = Room.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     title: 'concert',
//     price: 20,
//   });
//   await room.save();

//   // Create a fake data object
//   const data: RoomUpdatedEvent['data'] = {
//     id: room.id,
//     version: room.version + 1,
//     title: 'new room two',
//     price: 999,
//     userId: 'ablskdjf',
//   };

//   // Create a fake msg object
//   // @ts-ignore
//   const msg: Message = {
//     ack: jest.fn(),
//   };

//   // return all of this stuff
//   return { msg, data, room, listener };
// };

// it('finds, updates, and saves a room', async () => {
//   const { msg, data, room, listener } = await setup();

//   await listener.onMessage(data, msg);

//   const updatedRoom = await Room.findById(room.id);

//   expect(updatedRoom!.title).toEqual(data.title);
//   expect(updatedRoom!.price).toEqual(data.price);
//   expect(updatedRoom!.version).toEqual(data.version);
// });

// it('acks the message', async () => {
//   const { msg, data, listener } = await setup();

//   await listener.onMessage(data, msg);

//   expect(msg.ack).toHaveBeenCalled();
// });

// it('does not call ack if the event has a skipped version number', async () => {
//   const { msg, data, listener, room } = await setup();

//   data.version = 10;

//   try {
//     await listener.onMessage(data, msg);
//   } catch (err) {}

//   expect(msg.ack).not.toHaveBeenCalled();
// });
