import axios from 'axios';

export default ({ req }) => {
    if (typeof window === 'undefined') {
    // We are on the server

        // For production
        // return axios.create({
        //   baseURL: 'http://www.YOURDOMAIN.com',
        //   headers: req.headers,
        // });
        return axios.create({
            baseURL:
        'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers,
        });
    }

    // We must be on the browser
    return axios.create({
        baseUrl: '/',
    });
};
