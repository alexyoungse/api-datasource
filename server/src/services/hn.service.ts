import axios from 'axios';

const HN_API_BASE = 'https://hacker-news.firebaseio.com/v0';

export const getTopStories = async (limit: number = 10) => {
  try {
    const { data: storyIds } = await axios.get(`${HN_API_BASE}/topstories.json`);
    const stories = await Promise.all(
      storyIds.slice(0, limit).map((id: number) => {
        const { data } = axios.get(`${HN_API_BASE}/item/${id}.json`);
        return data;
      })
    );
    return stories;
  } catch (error) {
    console.error('Error fetching top stories:', error);
    throw error;
  }
};

export const searchStories = async (query: string) => {
  try {
    const { data } = await axios.get(`http://hn.algolia.com/api/v1/search?query=${query}`);
    return data.hits;
  } catch (error) {
    console.error('Error searching stories:', error);
    throw error;
  }
};

export const getStoryById = async(id: number): Promise<any> => {
  try {
    const { data } = await axios.get(`${HN_API_BASE}/item/${id}.json`);
    return data;
  } catch (error) {
    console.error(`Error fetching story ${id}:`, error);
    throw error;
  }
};
