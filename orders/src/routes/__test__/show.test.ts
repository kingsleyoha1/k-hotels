import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../../app';
import { Order } from '../../models/order';
import { Room } from '../../models/room';
import { OrderStatus } from '@kingsley555/common-module-k-hotels';

describe('GET /api/orders/:orderId', () => {
  const buildRoom = async () => {
    return Room.build({
      id: new mongoose.Types.ObjectId().toHexString(),
      title: 'Sample Room',
      price: 120,
    });
  };

  it('fetches the order for the correct user', async () => {
    const room = await buildRoom();
    await room.save();

    const user = global.signin();
    const order = Order.build({
      userId: 'er1234',
      room: room,
      status: OrderStatus.Created, 
      expiresAt: new Date() 
    });
    await order.save();

    const { body: fetchedOrder } = await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', user)
      .expect(200);

    expect(fetchedOrder.id).toEqual(order.id);
  });

  it('returns a 404 error if the order does not exist', async () => {
    const user = global.signin();
    const orderId = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .get(`/api/orders/${orderId}`)
      .set('Cookie', user)
      .expect(404);
  });

  it('returns a 401 error if the order does not belong to the user', async () => {
    const room = await buildRoom();
    await room.save();

    const userOne = global.signin();
    const order = Order.build({
      userId: new mongoose.Types.ObjectId().toHexString(), 
      room: room,
      status: OrderStatus.Created, 
      expiresAt: new Date()
    });
    await order.save();

    const userTwo = global.signin();
    await request(app)
      .get(`/api/orders/${order.id}`)
      .set('Cookie', userTwo)
      .expect(401);
  });
});
