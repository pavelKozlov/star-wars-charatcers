import axios from 'axios';
import { API_ENDPOINT, API_PROTOCOL } from '../constants/appConstants.js';

/**
 * Axios instance.
 *
 * @type {AxiosInstance}
 */
const fetcher = axios.create({
  baseURL: `${API_PROTOCOL}://${API_ENDPOINT}`,
});

export {
  fetcher,
}
