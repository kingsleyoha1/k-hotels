import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import cookieSession from 'cookie-session';
import { errorHandler, NotFoundError, currentUser } from '@kingsley555/common-module-k-hotels';
import { createHotelRouter } from './routes/hotels/hotel-create';
import { getAllHotels } from './routes/hotels/hotels';
import { getHotelRouter } from './routes/hotels/hotel';
import { updateHotelRouter } from './routes/hotels/hotel-update';
import { deleteHotelRouter } from './routes/hotels/hotel-delete';
import { createNewRoomRouter } from './routes/rooms/room-create';
import { getRoomsRouter } from './routes/rooms/rooms';
import { getRoomRouter } from './routes/rooms/room';
import { updateRoomRouter } from './routes/rooms/room-update';
import { deleteRoomRouter } from './routes/rooms/room-delete';


const app = express();
app.set('trust proxy', true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== 'test',
  })
);
app.use(currentUser);


app.use(createHotelRouter);
app.use(getAllHotels);
app.use(getRoomsRouter);
app.use(getHotelRouter);
app.use(updateHotelRouter);
app.use(deleteHotelRouter);


app.use(createNewRoomRouter);
app.use(getRoomRouter);
app.use(updateRoomRouter);
app.use(deleteRoomRouter);


app.use('/uploads', express.static('uploads'));

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
