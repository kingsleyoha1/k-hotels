import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { Order, OrderStatus } from './order';

interface RoomAttrs {
  id: string;
  title: string;
  price: number;
}

export interface RoomDoc extends mongoose.Document {
  title: string;
  price: number;
  version: number;
  isReserved(): Promise<boolean>;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<RoomDoc | null>;
}

const roomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

roomSchema.set('versionKey', 'version');
roomSchema.plugin(updateIfCurrentPlugin);

roomSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return Room.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};
roomSchema.statics.build = (attrs: RoomAttrs) => {
  return new Room({
    _id: attrs.id,
    title: attrs.title,
    price: attrs.price,
  });
};
roomSchema.methods.isReserved = async function () {
  // this === the room document that we just called 'isReserved' on
  const existingOrder = await Order.findOne({
    room: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Complete,
      ],
    },
  });

  return !!existingOrder;
};

const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema);

export { Room };
