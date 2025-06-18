import React from 'react';
import { Story } from '../types';
import Rating from './Rating';
import Comments from './Comments';

interface StoryItemProps {
  story: Story;
}

const StoryItem: React.FC<StoryItemProps> = ({ story }) => {
  return (
    <div className="story-item">
      <h3>
        <a href={story.url} target="_blank" rel="noopener noreferrer">
          {story.title}
        </a>
      </h3>
      <p>By {story.by} | {story.score} points</p>
      <Rating storyId={story.id} />
      <Comments storyId={story.id} />
    </div>
  );
};

export default StoryItem;
