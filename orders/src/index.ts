import mongoose from 'mongoose';
import { app } from './app';
import { rabbitMQWrapper } from './rabbitmq-wrapper';

import { natsWrapper } from './nats-wrapper';

import { RoomCreatedListener } from './events/listeners/room-created-listener';
import { RoomUpdatedListener } from './events/listeners/room-updated-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';

import { RoomUpdatedListen } from './events/listeners/room-update';
import { RoomCreatedListen } from './events/listeners/room-create';


const start = async () => {
  console.log('Starting......');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI_ORDERS) {
    throw new Error('MONGO_URI must be defined');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('NATS_CLUSTER_ID must be defined');
  }

  if (!process.env.RABBITMQ_URL) {
    throw new Error('RABBITMQ_URL must be defined');
  }

  try {
    await rabbitMQWrapper.connect(process.env.RABBITMQ_URL);
    console.log('Connected to RABBITMQ');

    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on('close', () => {
      console.log('NATS connection closed!');
      process.exit();
    });
    process.on('SIGINT', () => natsWrapper.client.close());
    process.on('SIGTERM', () => natsWrapper.client.close());

    // new RoomCreatedListener(natsWrapper.client).listen();
    // new RoomUpdatedListener(natsWrapper.client).listen();
    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }    
    const roomCreatedListen = new RoomCreatedListen(rabbitMQWrapper.channel);
     const roomUpdatedListen = new RoomUpdatedListen(rabbitMQWrapper.channel);
    new ExpirationCompleteListener(natsWrapper.client).listen();

    roomCreatedListen.listen();
    roomUpdatedListen.listen();
    // new PaymentCreatedListener(natsWrapper.client).listen();

    await mongoose.connect(process.env.MONGO_URI_ORDERS);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
