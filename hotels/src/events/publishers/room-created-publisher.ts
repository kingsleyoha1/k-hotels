import { rabbitMQWrapper } from '../../rabbitmq-wrapper';

import {Subjects, RoomCreatedEvent, Publisher } from '@kingsley555/common-module-k-hotels';

export class RoomCreatedPublisher extends Publisher<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;

  constructor() {
    super(rabbitMQWrapper.channel);
  }
}
