import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Room } from '../../models/room';

it('fetches the order', async () => {
  // Create a room
  const room = Room.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await room.save();

  // @ts-ignore
  const user = global.signin();
  // make a request to build an order with this room
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ roomId: room.id })
    .expect(201);

  // make request to fetch the order
  const { body: fetchedOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set('Cookie', user)
    .send()
    .expect(200);

  expect(fetchedOrder.id).toEqual(order.id);
});

it('returns an error if one user tries to fetch another users order', async () => {
  // Create a room
  const room = Room.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: 'concert',
    price: 20,
  });
  await room.save();

  // @ts-ignore
  const user = global.signin();
  // make a request to build an order with this room
  const { body: order } = await request(app)
    .post('/api/orders')
    .set('Cookie', user)
    .send({ roomId: room.id })
    .expect(201);

  // make request to fetch the order
  await request(app)
    .get(`/api/orders/${order.id}`)
    // @ts-ignore
    .set('Cookie', global.signin())
    .send()
    .expect(401);
});
