import React from 'react';
import { Review } from '../../types';
import StarRating from '../ui/StarRating';
import { UserCircle } from 'lucide-react';

interface ReviewCardProps {
  review: Review;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  // Format date from ISO to readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 mb-4 transition-shadow hover:shadow-md">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <UserCircle size={24} className="text-gray-400 mr-2" />
          <span className="font-medium text-gray-900">{review.userName}</span>
        </div>
        <div className="text-sm text-gray-500">{formatDate(review.date)}</div>
      </div>
      
      <div className="mt-2">
        <StarRating rating={review.rating} size={18} />
      </div>
      
      <p className="mt-3 text-gray-700 leading-relaxed">{review.comment}</p>
    </div>
  );
};

export default ReviewCard;