import { Subjects, Publisher, OrderCancelledEvent } from '@kingsley555/common-module-k-hotels';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
