import axios from 'axios';
import { Book } from '../types';

const API_URL = 'http://localhost:5000/api';

export const getAllBooks = async (): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}/books`);
  return response.data;
};

export const searchBooks = async (query: string): Promise<Book[]> => {
  const response = await axios.get(`${API_URL}/books/search`, {
    params: { query }
  });
  return response.data;
};