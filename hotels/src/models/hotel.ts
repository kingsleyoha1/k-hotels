import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// Room Interfaces
interface RoomAttrs {
  roomNumber: number;
  type: string;
  amenities: string[];
  pricePerNight: number;
  isBooked?: boolean;
  bookedByUserId?: string;
}

interface RoomDoc extends mongoose.Document {
  roomNumber: number;
  type: string;
  amenities: string[];
  pricePerNight: number;
  isBooked: boolean;
  version: number;
  orderId?: string;
  bookedByUserId?: string;
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

// Hotel Interfaces
interface HotelAttrs {
  name: string;
  location: string;
  userId: string,
  rooms?: RoomDoc[];
}

interface HotelDoc extends mongoose.Document {
  name: string;
  location: string;
  userId: string,
  rooms?: RoomDoc[];
  version: number;
}

interface HotelModel extends mongoose.Model<HotelDoc> {
  build(attrs: HotelAttrs): HotelDoc;
}


// Room Schema
const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true },
  type: { type: String, required: true },
  amenities: [String],
  pricePerNight: { type: Number, required: true },
  isBooked: { type: Boolean, required: true, default: false },
  bookedByUserId: { type: String }
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
  return new Rooms(attrs);
};

const Rooms = mongoose.model<RoomDoc, RoomModel>('Rooms', roomSchema);

// Hotel Schema
const hotelSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  rooms: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Rooms'
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
  return new Hotels(attrs);
};

const Hotels = mongoose.model<HotelDoc, HotelModel>('Hotels', hotelSchema);

export { Rooms, Hotels };

  