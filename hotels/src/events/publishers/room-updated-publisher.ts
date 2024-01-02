import { Publisher, Subjects, RoomUpdatedEvent } from '@kingsley555/common-module-k-hotels';

export class RoomUpdatedPublisher extends Publisher<RoomUpdatedEvent> {
  subject: Subjects.RoomUpdated = Subjects.RoomUpdated;
}
