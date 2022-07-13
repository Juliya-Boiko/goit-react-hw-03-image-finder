import axios from "axios";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '27622975-8053d8179d4dd5adbee6b248d';
const BASE_URL = 'https://pixabay.com/api/';

const customAxios = axios.create({
    baseURL: `${BASE_URL}?key=${API_KEY}`
});

export const getImages = async (params) => {
    try {
        const result = await customAxios.get('', { params });
        return result;
    } catch (error) {
        console.log(error);
    }
}