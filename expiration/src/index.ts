
import { rabbitMQWrapper } from './rabbitmq-wrapper';
import { OrderCreatedListener } from './events/listeners/order-created-listener';



const start = async () => {
  console.log('Starting......');

  if (!process.env.RABBITMQ_URL) {
    throw new Error('RABBITMQ_URL must be defined');
  }

  try {
 
    await rabbitMQWrapper.connect(process.env.RABBITMQ_URL);
    console.log('Connected to RABBITMQ');

    if (!rabbitMQWrapper.channel) {
      throw new Error('Cannot access RabbitMQ channel');
    }    

    const orderCreatedListener = new OrderCreatedListener(rabbitMQWrapper.channel);
    orderCreatedListener.listen();
  
  } catch (err) {
    console.error(err);
  }
};

start();
