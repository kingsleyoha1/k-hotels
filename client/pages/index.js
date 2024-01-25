import Link from 'next/link';
import { useState } from 'react';


const LandingPage = ({ currentUser, hotels }) => {
  const hotelList = hotels.map((hotel) => {
    return (
      <tr key={hotel.id}>
        <td>{hotel.name}</td>
        <td>{hotel.location}</td>
        {hotel.room.length > 0 &&
         <td>
         <Link href="/hotels/[hotelId]" as={`/hotels/${hotel.id}`}>
           View Hotel
         </Link>
       </td> }
      </tr>
    );
  });

  return (
    <div>
      <h1>Hotels</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            {hotelList.room && <th>Link</th> }
          </tr>
        </thead>
        <tbody>{hotelList}</tbody>
      </table>
    </div>
  );
};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  const { data } = await client.get('/api/hotels');

  return { hotels: data };
};

export default LandingPage;
