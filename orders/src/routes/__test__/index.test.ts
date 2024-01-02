import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Room } from '../../models/room';

const buildRoom = async () => {
  const room = Room.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await room.save();

  return room;
};

it('fetches orders for an particular user', async () => {
  // Create three rooms
  const roomOne = await buildRoom();
  const roomTwo = await buildRoom();
  const roomThree = await buildRoom();

   // @ts-ignore
  const userOne = global.signin();
   // @ts-ignore
  const userTwo = global.signin();
  // Create one order as User #1
  await request(app)
    .post('/api/orders')
    .set('Cookie', userOne)
    .send({ roomId: roomOne.id })
    .expect(201);

  // Create two orders as User #2
  const { body: orderOne } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ roomId: roomTwo.id })
    .expect(201);
  const { body: orderTwo } = await request(app)
    .post('/api/orders')
    .set('Cookie', userTwo)
    .send({ roomId: roomThree.id })
    .expect(201);

  // Make request to get orders for User #2
  const response = await request(app)
    .get('/api/orders')
    .set('Cookie', userTwo)
    .expect(200);

  // Make sure we only got the orders for User #2
  expect(response.body.length).toEqual(2);
  expect(response.body[0].id).toEqual(orderOne.id);
  expect(response.body[1].id).toEqual(orderTwo.id);
  expect(response.body[0].room.id).toEqual(roomTwo.id);
  expect(response.body[1].room.id).toEqual(roomThree.id);
});
