import React, { useState } from 'react';
import StarRating from '../ui/StarRating';
import Button from '../ui/Button';
import { api } from '../../services/api';

interface ReviewFormProps {
  bookId: string;
  onReviewAdded: () => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ bookId, onReviewAdded }) => {
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!userName.trim()) {
      newErrors.userName = 'Name is required';
    }

    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }

    if (!comment.trim()) {
      newErrors.comment = 'Review comment is required';
    } else if (comment.length < 10) {
      newErrors.comment = 'Review must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await api.addReview({
        bookId,
        userName,
        rating,
        comment
      });

      // Reset form
      setUserName('');
      setRating(0);
      setComment('');
      setSubmitSuccess(true);
      onReviewAdded();

      // Clear success message after a few seconds
      setTimeout(() => {
        setSubmitSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
      setErrors({ submit: 'There was an error submitting your review. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Write a Review</h3>
      
      {submitSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your review has been submitted successfully!
        </div>
      )}

      {errors.submit && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {errors.submit}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="userName" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.userName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.userName && (
            <p className="mt-1 text-sm text-red-600">{errors.userName}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rating
          </label>
          <div>
            <StarRating 
              rating={rating} 
              editable={true} 
              size={24}
              onChange={setRating} 
            />
          </div>
          {errors.rating && (
            <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
          )}
        </div>
        
        <div className="mb-4">
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-1">
            Your Review
          </label>
          <textarea
            id="comment"
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.comment ? 'border-red-500' : 'border-gray-300'
            }`}
          ></textarea>
          {errors.comment && (
            <p className="mt-1 text-sm text-red-600">{errors.comment}</p>
          )}
        </div>
        
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="mt-2"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </div>
  );
};

export default ReviewForm;