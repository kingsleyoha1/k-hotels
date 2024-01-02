import { Message } from 'node-nats-streaming';
import mongoose from 'mongoose';
import { RoomCreatedEvent } from '@kingsley555/common-module-k-hotels';
import { RoomCreatedListener } from '../room-created-listener';
import { natsWrapper } from '../../../nats-wrapper';
import { Room } from '../../../models/room';

const setup = async () => {
  // create an instance of the listener
  const listener = new RoomCreatedListener(natsWrapper.client);

  // create a fake data event
  const data: RoomCreatedEvent['data'] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 10,
    userId: new mongoose.Types.ObjectId().toHexString(),
  };

  // create a fake message object
  // @ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, data, msg };
};

it('creates and saves a room', async () => {
  const { listener, data, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure a room was created!
  const room = await Room.findById(data.id);

  expect(room).toBeDefined();
  expect(room!.title).toEqual(data.title);
  expect(room!.price).toEqual(data.price);
});

it('acks the message', async () => {
  const { data, listener, msg } = await setup();

  // call the onMessage function with the data object + message object
  await listener.onMessage(data, msg);

  // write assertions to make sure ack function is called
  expect(msg.ack).toHaveBeenCalled();
});
