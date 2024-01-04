import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { Publisher, OrderCreatedEvent, Subjects } from '@kingsley555/common-module-k-hotels';
export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;

  constructor() {
    super(rabbitMQWrapper.channel);
  }
}
