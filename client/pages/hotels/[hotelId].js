import Link from 'next/link';

const HotelShow = ({ hotel }) => {

  const roomsList = hotel.room.map((rm) => {
    return (
      <tr key={rm.id}>
        <td>{rm.title}</td>
        <td>{rm.price}</td>
        <td>
          <Link href="/hotels/room/[roomId]" as={`/hotels/room/${rm.id}`}>
            View Room
          </Link>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <h1>{hotel.name}</h1>
      <div>{hotel.location}</div>

      <table className="table">
        <thead>
          <tr>
            <th>Room Type</th>
            <th>Price</th>
            <th>Link</th>
          </tr>
        </thead>
        <tbody>{roomsList}</tbody>
      </table>
    </div>
  );
};

HotelShow.getInitialProps = async (context, client) => {
  const { hotelId } = context.query;
  const { data } = await client.get(`/api/hotels/${hotelId}`);

  return { hotel: data };
};

export default HotelShow;
