import Link from 'next/link';

const LandingPage = ({ hotels }) => {
    const hotelList = hotels.map((hotel) => (
        <div key={hotel.id} className="col-lg-4 col-md-6 mb-4">
            <div className="card h-100">
                <Link href="/hotels/[hotelId]" as={`/hotels/${hotel.id}`}>
                    <div className="cursor-pointer">
                        <img src={hotel.image} className="card-img-top" alt={hotel.name} />
                        <div className="card-body">
                            <h5 className="card-title">{hotel.name}</h5>
                            <p className="card-text">{hotel.location}</p>
                        </div>
                    </div>
                </Link>
                <div className="card-footer border-top-0 bg-white">
                    <Link href={`/hotels/${hotel.id}/room`}>
                        <div className="btn btn-primary w-100">Create Room</div>
                    </Link>
                </div>
            </div>
        </div>
    ));

    return (
        <div className="container">
            <h1 className="my-4">Hotels</h1>
            <div className="row">
                {hotelList}
            </div>
        </div>
    );
};

LandingPage.getInitialProps = async (context, client) => {
    const { data } = await client.get('/api/hotels');

    return { hotels: data };
};

export default LandingPage;
