import React, { useState, useEffect } from 'react';
import { getRating, createRating, updateRating } from '../services/rating.service';
import { useAuth } from '../context/AuthContext';

interface RatingProps {
  storyId: number;
}

const Rating: React.FC<RatingProps> = ({ storyId }) => {
  const { user } = useAuth();
  const [rating, setRating] = useState<number | null>(null);
  const [userRating, setUserRating] = useState<number | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const fetchRating = async () => {
      try {
        const avgRating = await getRating(storyId);
        setRating(avgRating);

        if (user) {
          const userRating = await getRating(storyId, user.userId);
          setUserRating(userRating);
        }
      } catch (error) {
        console.error('Error fetching rating:', error);
      }
    };
    fetchRating();
  }, [storyId, user]);

  const handleRating = async (value: number) => {
    if (!user) {
      alert('Please login to rate stories');
      return;
    }

    try {
      if (userRating) {
        await updateRating(storyId, value);
      } else {
        await createRating(storyId, value);
      }
      setUserRating(value);

      const avgRating = await getRating(storyId);
      setRating(avgRating);
    } catch (error) {
      console.error('Error saving rating:', error);
    }
  };

  return (
    <div className="rating">
      <span>Rating: {rating ? rating.toFixed(1) : 'Not rated yet' } </span>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          className={`star ${star <= (hover || userRating || 0) ? 'filled' : ''}` : ''}
          onClick={() => handleRating(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(null)}
          disabled={!user}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;
