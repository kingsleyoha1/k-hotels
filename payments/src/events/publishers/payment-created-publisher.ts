import { rabbitMQWrapper } from '../../rabbitmq-wrapper';

import {Subjects, PaymentCreatedEvent, Publisher } from '@kingsley555/common-module-k-hotels';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  subject: Subjects.PaymentCreated = Subjects.PaymentCreated;

  constructor() {
    super(rabbitMQWrapper.channel);
  }
}

