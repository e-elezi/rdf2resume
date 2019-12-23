import axios from 'axios';

export default axios.create({
    baseURL: 'https://ec.europa.eu/esco/api'
})