import axios from 'axios';
import {API_DOMAIN} from '@/constants';

export const get = async (path, options) => {
  try {
    const response = await axios.get(API_DOMAIN + path, options);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const post = async (path, options) => {
  try {
    const response = await axios.post(API_DOMAIN + path, options, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const del = async path => {
  try {
    const response = await axios.delete(API_DOMAIN + path);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const patch = async (path, options) => {
  try {
    const response = await axios.patch(API_DOMAIN + path, options, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
