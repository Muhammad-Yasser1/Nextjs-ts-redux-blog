import axios from 'axios';

const userApiClient = axios.create({
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
    },
});

export default userApiClient;
