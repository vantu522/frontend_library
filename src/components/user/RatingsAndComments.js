import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Star, User } from 'lucide-react';

const RatingsAndComments = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating API call to fetch comments
    const fetchComments = async () => {
      setLoading(true);
      try {
        // Replace this with actual API call
        const response = await fetch(`/api/books/${bookId}/comments`);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, [bookId]);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    // Simulating API call to submit a new comment
    // Replace this with actual API call
    const newCommentObj = {
      id: comments.length + 1,
      user: 'Current User',
      rating: newRating,
      content: newComment,
      date: new Date().toISOString(),
    };
    setComments([newCommentObj, ...comments]);
    setNewComment('');
    setNewRating(0);
  };

  return (
    <div>
      {/* Add new comment form */}
      <form onSubmit={handleSubmitComment} className="mb-8">
        <div className="mb-4">
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-1">
            Đánh giá
          </label>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`${
                  star <= newRating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 focus:outline-none`}
              >
                <Star className="h-6 w-6" />
              </button>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Bình luận
          </label>
          <textarea
            id="comment"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition"
        >
          Gửi đánh giá
        </button>
      </form>

      {/* Display existing comments */}
      {loading ? (
        <p>Đang tải bình luận...</p>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => (
            <div key={comment.id} className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <User className="h-6 w-6 text-gray-400 mr-2" />
                  <span className="font-medium">{comment.user}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < comment.rating ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-2">{comment.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(comment.date).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

RatingsAndComments.propTypes = {
  bookId: PropTypes.string.isRequired,
};

export default RatingsAndComments;

