import { Request, Response } from 'express';
import { getTopStories, searchStories, getStoryById } from '../services/hn.service';

export const getTopStoriesHandler = async (req: Request, res: Response) => {
  try {
    const limit = parseInt(req.query.limit as string) || 10;
    const stories = await getTopStories(limit);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch top stories' });
  }
};

export const searchStoriesHandler = async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string;
    if (!query) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }
    const stories = await searchStories(query);
    res.json(stories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to search stories' });
  }
};

export const getStoryHandler = async (req: Request, res: Response) => {
  try {
    const storyId = parseInt(req.params.id);
    if (isNaN(storyId)) {
      return res.status(400).json({ error: 'Invalid story ID' });
    }
    const story = await getStoryById(storyId);
    if (!story) {
      return res.status(404).json({ error: 'Story not found'});
    }
    res.json(story);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch story' });
  }
};
