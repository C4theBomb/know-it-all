import axios from 'axios';
import Cookies from 'js-cookie';

function createRequest() {
    var request = axios.create({
        baseURL: `${process.env.REACT_APP_API_ROOT}`,
    });

    request.defaults.headers.common['Content-Type'] = 'application/json';
    request.defaults.headers.common['Authorization'] = `bearer ${Cookies.get('token')}`

    return request;
}

export { createRequest };
