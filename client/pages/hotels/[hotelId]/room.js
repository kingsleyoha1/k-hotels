import { useState } from 'react';
import Router from 'next/router';
import useImageUpload from '../../../hooks/use-image-upload';
import useRequest from '../../../hooks/use-request';

const NewRoom = ({ hotel }) => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const { image, handleImageUpload } = useImageUpload();

    const { doRequest, errors } = useRequest({
        url: `/api/hotels/${hotel.id}/room`,
        method: 'post',
        body: {
            title,
            price,
            image,
        },
        onSuccess: () => Router.push(`/hotels/${hotel.id}/rooms`),
    });

    const onSubmit = (event) => {
        event.preventDefault();

        doRequest();
    };

    const onBlur = () => {
        const value = parseFloat(price);

        if (isNaN(value)) {
            return;
        }

        setPrice(value.toFixed(2));
    };

    return (
        <div>
            <h1>Create a Room</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Room Type</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input
                        value={price}
                        onBlur={onBlur}
                        onChange={(e) => setPrice(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Image</label>
                    <input
                        id="imgUpload"
                        accept="image/*"
                        type="file"
                        onChange={handleImageUpload}
                        required
                        className="form-control"
                    />
                </div>
                {errors}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

NewRoom.getInitialProps = async (context, client) => {
    const { hotelId } = context.query;
    const { data } = await client.get(`/api/hotels/${hotelId}`);

    return { hotel: data };
};

export default NewRoom;

