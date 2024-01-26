import Link from 'next/link';

const HotelShow = ({ hotel }) => {
  const roomsList = hotel.room.map((rm) => (
    <div key={rm.id} className="col-lg-4 col-md-6 mb-4">
      <div className="card h-100">
        <img src={rm.image} className="card-img-top" alt={rm.title} />
        <div className="card-body">
          <h5 className="card-title">{rm.title}</h5>
          <p className="card-text">${rm.price}/Night</p>
          <Link href="/hotels/room/[roomId]" as={`/hotels/room/${rm.id}`}>
            <button className="btn btn-primary">View Room</button>
          </Link>
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
