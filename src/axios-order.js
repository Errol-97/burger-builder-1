import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-builder-be216-default-rtdb.firebaseio.com/'
});

export default instance;
