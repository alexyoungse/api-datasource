import React from 'react';
import { Story } from '../types';
import StoryItem from './StoryItem';

interface StoryListProps {
  stories: Story[];
}

const StoryList: React.FC<StoryListProps> = ({ stories }) => {
  return (
    <div className="story-list">
      {stories.map((story) => (
        <StoryItem key={story.id} story={story}/>
      ))}
    </div>
  );
};

export default StoryList;
