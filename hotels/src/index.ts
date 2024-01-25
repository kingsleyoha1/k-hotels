import mongoose from 'mongoose';
import { app } from './app';
import { rabbitMQWrapper } from './rabbitmq-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';
import { OrderCancelledListener } from './events/listeners/order-cancelled-listener';

const start = async () => {
  console.log('Starting...');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI_HOTEL) {
    throw new Error('MONGO_URI_HOTEL must be defined');
  }
 
  if (!process.env.RABBITMQ_URL) {
    throw new Error('RABBITMQ_URL must be defined');
  }

  try {

    await rabbitMQWrapper.connect(process.env.RABBITMQ_URL);
    console.log('Connected to RABBITMQ');

    const orderCreatedListener = new OrderCreatedListener(rabbitMQWrapper.channel);
    const orderCancelledListener = new OrderCancelledListener(rabbitMQWrapper.channel);

    orderCreatedListener.listen();
    orderCancelledListener.listen();

    await mongoose.connect(process.env.MONGO_URI_HOTEL);
    console.log('Connected to MongoDb');
  } catch (err) {
    console.error(err);
  }

  app.listen(3000, () => {
    console.log('Listening on port 3000!!!!!!!!');
  });
};

start();
