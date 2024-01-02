import { Publisher, OrderCreatedEvent, Subjects } from '@kingsley555/common-module-k-hotels';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
