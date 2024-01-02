import { Publisher, Subjects, RoomCreatedEvent } from '@kingsley555/common-module-k-hotels';

export class RoomCreatedPublisher extends Publisher<RoomCreatedEvent> {
  subject: Subjects.RoomCreated = Subjects.RoomCreated;
}
