import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';
import { RoomDoc } from './room';


// Hotel Interfaces
interface HotelAttrs {
  name: string;
  location: string;
  userId: string,
  room?: RoomDoc[];
}

interface HotelDoc extends mongoose.Document {
  name: string;
  location: string;
  userId: string,
  room?: RoomDoc[];
  version: number;
}

interface HotelModel extends mongoose.Model<HotelDoc> {
  build(attrs: HotelAttrs): HotelDoc;
}

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  room: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room'
  }],
}, {
  toJSON: {
    transform(doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    },
  },
});
hotelSchema.set('versionKey', 'version');
hotelSchema.plugin(updateIfCurrentPlugin);

hotelSchema.statics.build = (attrs: HotelAttrs) => {
  return new Hotel(attrs);
};

const Hotel = mongoose.model<HotelDoc, HotelModel>('Hotel', hotelSchema);

export { Hotel };

  