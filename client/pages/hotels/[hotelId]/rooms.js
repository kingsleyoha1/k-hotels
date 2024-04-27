import Link from 'next/link';

const RoomsPage = ({ rooms }) => {
    const roomList = rooms.map((room) => (
        <div key={room.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <Link href="/hotels/room/[roomId]" as={`/hotels/room/${room.id}`}>
                    <div className="cursor-pointer">
                        <img src={room.image} className="card-img-top" alt={room.title} />
                        <div className="card-body">
                            <h5 className="card-title">{room.title}</h5>
                            <p className="card-text">Price: ${room.price}</p>
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1 className="my-4">Rooms</h1>
            <div className="row">
                {roomList}
            </div>
        </div>
    );
};

RoomsPage.getInitialProps = async (context, client) => {
    const { hotelId } = context.query;
    const { data } = await client.get(`/api/hotels/${hotelId}/rooms`);

    return { rooms: data };
};

export default RoomsPage;
