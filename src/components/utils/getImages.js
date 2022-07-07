import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_KEY = '27622975-8053d8179d4dd5adbee6b248d';
const BASE_URL = 'https://pixabay.com/api/';

const customAxios = axios.create({
    baseURL: `${BASE_URL}?key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
});

export const getImages = async (params) => {
    try {
        const result = await customAxios.get('', { params });
        return result;
    } catch (error) {
        toast.warn(`ERROR ${error}`, {
                theme: "colored",
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
    }
}