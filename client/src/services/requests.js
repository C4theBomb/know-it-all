import axios from 'axios';

function createRequest(path) {
    var request = axios.create({
        baseURL: `${process.env.REACT_APP_API_ROOT}${path}`,
    });

    request.defaults.headers.common['Content-Type'] = 'application/json';

    return request;
}

export { createRequest };
