import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { Publisher, OrderCancelledEvent, Subjects } from '@kingsley555/common-module-k-hotels';
export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;

  constructor() {
    super(rabbitMQWrapper.channel);
  }
}
