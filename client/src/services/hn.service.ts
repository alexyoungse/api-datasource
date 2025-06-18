import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:3000/api';

export const getTopStories = async (limit: number = 10) => {
  try {
    const response = await axios.get(`${API_BASE}/hn/top`, {
      params: { limit }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const searchStories = async (query: string) => {
  try {
    const response = await axios.get(`${API_BASE}/hn/search`, {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Error searching stories:', error);
    throw error;
  }
};

export const getStory = async (id: number) => {
  try {
    const response = await axios.get(`${API_BASE}/hn/stories/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching story:', error);
    throw error;
  }
};
