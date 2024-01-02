import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';


interface RoomAttrs {
    title: string;
    price: number;
    userId: string;
    // roomNumber: number;
    // type: string;
    // amenities: string[];
  }
  
  export interface RoomDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
    // roomNumber: number;
    // type: string;
    // amenities: string[];
    version: number;
    orderId?: string;
  }


interface RoomModel extends mongoose.Model<RoomDoc> {
    build(attrs: RoomAttrs): RoomDoc;
  }
  
  // Room Schema
  const roomSchema = new mongoose.Schema({
    title: { type: String, required: true },
    price: { type: Number, required: true },
    userId: { type: String, required: true },
    // roomNumber: { type: Number, required: true },
    // type: { type: String, required: true },
    // amenities: [String],
    orderId: {type: String },
  }, {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  });
  roomSchema.set('versionKey', 'version');
  roomSchema.plugin(updateIfCurrentPlugin);
  
  roomSchema.statics.build = (attrs: RoomAttrs) => {
    return new Room(attrs);
  };
  
  const Room = mongoose.model<RoomDoc, RoomModel>('Room', roomSchema);

export { Room };
