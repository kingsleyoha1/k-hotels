import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import { Publisher } from '../base-publisher';

import {Subjects, RoomUpdatedEvent } from '@kingsley555/common-module-k-hotels';

export class RoomUpdatePublish extends Publisher<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;

  // Add a constructor if you need to pass any additional parameters
  constructor() {
    // Make sure to pass the RabbitMQ channel
    super(rabbitMQWrapper.channel);
  }
}
