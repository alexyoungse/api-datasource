import React, { useState, useEffect } from 'react';
import { getComments, addComment } from '../services/comment.service';
import { useAuth } from '../context/AuthContext';

interface CommentsProp {
  storyId: number;
}

const Comments: React.FC<CommentsProp> = ({ storyId }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const comments = await getComments(storyId);
        setComments(comments);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [storyId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!user) {
      alert('Please login to add comments');
      return;
    }

    try {
      const comment = await addComment(storyId, newComment);
      setComments([...comments, comment]);
      setNewComment('');
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="comments">
      <h3>Comments {{comments.length}}</h3>
      {user && (
        <form onSubmit={handleSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
          />
          <button type="submit">Post Comment</button>
        </form>
      )}
      <div className="comment-list">
        {comments.map((comment) => {
          <div key={comment._id} className="comment">
            <p>{comment.text}</p>
            <small>
              By {comment.userId} - {new Date(comment.createdAt).toLocaleString()}
            </small>
          </div>
        })}
      </div>
    </div>
  );
};
