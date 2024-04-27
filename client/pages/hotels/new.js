import { useState } from 'react';
import Router from 'next/router';
import useImageUpload from '../../hooks/use-image-upload';
import useRequest from '../../hooks/use-request';

const NewHotel = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const { image, handleImageUpload } = useImageUpload();

    const { doRequest, errors } = useRequest({
        url: '/api/hotels',
        method: 'post',
        body: {
            name,
            location,
            image,
        },
        onSuccess: () => Router.push('/'),
    });

    const onSubmit = (event) => {
        console.log('yes');
        event.preventDefault();

        doRequest();
    };

    return (
        <div>
            <h1>Create a Hotel</h1>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Name of Hotel</label>
                    <input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
                    <input
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label>Location</label>
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

export default NewHotel;
