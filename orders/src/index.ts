import mongoose from 'mongoose';
import { app } from './app';
import { rabbitMQWrapper } from './rabbitmq-wrapper';
import { RoomCreatedListener } from './events/listeners/room-created-listener';
import { RoomUpdatedListener } from './events/listeners/room-updated-listener';
import { ExpirationCompleteListener } from './events/listeners/expiration-complete-listener';
import { PaymentCreatedListener } from './events/listeners/payment-created-listener';


const start = async () => {
  console.log('Starting......');

  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined');
  }
  if (!process.env.MONGO_URI_ORDERS) {
    throw new Error('MONGO_URI must be defined');
  }

  if (!process.env.RABBITMQ_URL) {
    throw new Error('RABBITMQ_URL must be defined');
  }

  try {
 
    await rabbitMQWrapper.connect(process.env.RABBITMQ_URL);
    console.log('Connected to RABBITMQ');

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }    

    const roomUpdatedListen = new RoomUpdatedListener(rabbitMQWrapper.channel);

    const roomCreatedListen = new RoomCreatedListener(rabbitMQWrapper.channel);
   const expirationCompleteListener = new ExpirationCompleteListener(rabbitMQWrapper.channel);
    roomUpdatedListen.listen();
    roomCreatedListen.listen();
    expirationCompleteListener.listen();
   
    const paymentCreated = new PaymentCreatedListener(rabbitMQWrapper.channel);
    paymentCreated.listen();

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
