import { rabbitMQWrapper } from '../../rabbitmq-wrapper';
import {Subjects, RoomUpdatedEvent, Publisher } from '@kingsley555/common-module-k-hotels';

export class RoomUpdatedPublisher extends Publisher<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;

  // Add a constructor if you need to pass any additional parameters
  constructor() {
    // Make sure to pass the RabbitMQ channel
    super(rabbitMQWrapper.channel);
  }
}
