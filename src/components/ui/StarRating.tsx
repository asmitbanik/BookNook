import React from 'react';
import { Star } from 'lucide-react';

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: number;
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  maxRating = 5,
  size = 20,
  editable = false,
  onChange
}) => {
  const [hoverRating, setHoverRating] = React.useState(0);
  
  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };
  
  const handleMouseEnter = (index: number) => {
    if (editable) {
      setHoverRating(index + 1);
    }
  };
  
  const handleMouseLeave = () => {
    if (editable) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="flex">
      {[...Array(maxRating)].map((_, index) => {
        const starValue = index + 1;
        const filled = hoverRating ? starValue <= hoverRating : starValue <= rating;
        
        return (
          <span
            key={index}
            className={`inline-block transition-transform ${editable ? 'cursor-pointer hover:scale-110' : ''}`}
            onClick={() => handleClick(index)}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            role={editable ? "button" : undefined}
            aria-label={editable ? `Rate ${starValue} out of ${maxRating}` : undefined}
          >
            <Star 
              size={size} 
              className={`${
                filled 
                  ? 'text-yellow-400 fill-yellow-400' 
                  : 'text-gray-300'
              } transition-colors`} 
            />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;