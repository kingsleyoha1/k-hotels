import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const HotelShow = ({ hotel }) => {
    const [rooms, setRooms] = useState(hotel.room);

    const handleDelete = async (roomId) => {
        try {
            await axios.delete(`/api/hotels/room/${roomId}`);
            const updatedRooms = rooms.filter((room) => room.id !== roomId);
            setRooms(updatedRooms);
        } catch (error) {
            console.error('Delete error:', error);// eslint-disable-line
        }
    };
    const roomsList = rooms.map((rm) => (
        <div key={rm.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <img src={rm.image} className="card-img-top" alt={rm.title} />
                <div className="card-body">
                    <h5 className="card-title">{rm.title}</h5>
                    <p className="card-text">${rm.price}/Night</p>
                    <Link href="/hotels/room/[roomId]" as={`/hotels/room/${rm.id}`}>
                        <div className="btn btn-primary">View Room</div>
                    </Link>
                    <div className="btn btn-danger" onClick={() => handleDelete(rm.id)}>Delete Room</div>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1 className="my-4">{hotel.name}</h1>
            <h3 className="mb-4">{hotel.location}</h3>
            <div className="row">
                {roomsList}
            </div>
        </div>
    );
};

HotelShow.getInitialProps = async (context, client) => {
    const { hotelId } = context.query;
    const { data } = await client.get(`/api/hotels/${hotelId}`);

    return { hotel: data };
};

export default HotelShow;
