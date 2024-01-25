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
      <div>
      <h1>{room.title}</h1>
      <h4>Price: {room.price}</h4>
      {errors}
      <button onClick={() => doRequest()} className="btn btn-primary">
        Purchase
      </button>
    </div>
    );
  };
  
  Room.getInitialProps = async (context, client) => {
    const { roomId } = context.query;
    const { data } = await client.get(`/api/hotels/room/${roomId}`);
  
    return { room: data };
  };
  
  export default Room;
  