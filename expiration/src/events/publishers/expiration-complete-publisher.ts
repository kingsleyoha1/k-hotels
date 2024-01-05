
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import {Subjects, ExpirationCompleteEvent, Publisher } from '@kingsley555/common-module-k-hotels';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;

  constructor() {
    super(rabbitMQWrapper.channel);
  }
}
