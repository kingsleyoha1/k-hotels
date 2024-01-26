import Router from 'next/router';
import useRequest from '../../../hooks/use-request';

const Room = ({ room }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: {
      roomId: room.id,
    },
    onSuccess: (order) =>
      Router.push('/orders/[orderId]', `/orders/${order.id}`),
  });

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
      <div className="card text-center" style={{ width: '50%' }}> {/* Adjusted width */}
        {room.image && <img src={room.image} className="card-img-top" alt={room.title} />} {/* Room image */}
        <div className="card-body">
          <h5 className="card-title">{room.title}</h5>
          <p className="card-text">Price: ${room.price}</p>
          {errors && <div className="alert alert-danger">{errors}</div>}
          <button onClick={() => doRequest()} className="btn btn-primary">
            Book
          </button>
        </div>
      </div>
    </div>
  );
};

Room.getInitialProps = async (context, client) => {
  const { roomId } = context.query;
  const { data } = await client.get(`/api/hotels/room/${roomId}`);

  return { room: data };
};

export default Room;
