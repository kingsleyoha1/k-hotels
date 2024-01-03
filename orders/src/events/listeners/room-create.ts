import { ConsumeMessage } from 'amqplib';
import { Subjects, RoomCreatedEvent } from '@kingsley555/common-module-k-hotels';
import { Room } from '../../models/room';
import { Listener } from '../base-listerner';

export class RoomCreatedListen extends Listener<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;
  queueGroupName = 'room-service-queue-group'; // Use a specific queue group name

  async onMessage(data: RoomCreatedEvent['data'], msg: ConsumeMessage) {
    console.log(`Event data: ${JSON.stringify(data)}`);

    const { id, title, price, userId, version } = data; // Destructure needed data

    // Business logic to handle the incoming event
    const room = Room.build({
      id,
      title,
      price,
      // Add other necessary fields like userId, version, etc.
    });
    await room.save();

    // Acknowledge the message
    this.channel.ack(msg);
  }
}
