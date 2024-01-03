// Import the RabbitMQ channel from your wrapper
import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { Publisher } from '../base-publisher';

import {Subjects, RoomCreatedEvent } from '@kingsley555/common-module-k-hotels';

export class RoomCreatedPublish extends Publisher<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;

  // Add a constructor if you need to pass any additional parameters
  constructor() {
    // Make sure to pass the RabbitMQ channel
    super(rabbitMQWrapper.channel);
  }
}
