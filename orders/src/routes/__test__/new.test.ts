// import mongoose from 'mongoose';
// import request from 'supertest';
// import { app } from '../../app';
// import { Order, OrderStatus } from '../../models/order';
// import { Room } from '../../models/room';
// import { natsWrapper } from '../../nats-wrapper';

// it('returns an error if the room does not exist', async () => {
//   const roomId = new mongoose.Types.ObjectId();

//   await request(app)
//     .post('/api/orders')
//     // @ts-ignore
//     .set('Cookie', global.signin())
//     .send({ roomId })
//     .expect(404);
// });

// it('returns an error if the room is already reserved', async () => {
//   const room = Room.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     title: 'concert',
//     price: 20,
//   });
//   await room.save();
//   const order = Order.build({
//     room,
//     userId: 'laskdflkajsdf',
//     status: OrderStatus.Created,
//     expiresAt: new Date(),
//   });
//   await order.save();

//   await request(app)
//     .post('/api/orders')
//     // @ts-ignore
//     .set('Cookie', global.signin())
//     .send({ roomId: room.id })
//     .expect(400);
// });

// it('reserves a room', async () => {
//   const room = Room.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     title: 'concert',
//     price: 20,
//   });
//   await room.save();

//   await request(app)
//     .post('/api/orders')
//      // @ts-ignore
//     .set('Cookie', global.signin())
//     .send({ roomId: room.id })
//     .expect(201);
// });

// it('emits an order created event', async () => {
//   const room = Room.build({
//     id: new mongoose.Types.ObjectId().toHexString(),
//     title: 'concert',
//     price: 20,
//   });
//   await room.save();

//   await request(app)
//     .post('/api/orders')
//      // @ts-ignore
//     .set('Cookie', global.signin())
//     .send({ roomId: room.id })
//     .expect(201);

//   expect(natsWrapper.client.publish).toHaveBeenCalled();
// });
