import React, { useState } from 'react';
import ReviewStar from '@components/main/review-star';
import dayjs from 'dayjs';
import ThumbUpIcon from "@assets/thumbup.svg?react";

interface ReviewCardProps {
  id: number;
  userImage: string;
  userName: string;
  content: string;
  userDescription: string;
  likes: number;
  rating: number;
  createdAt: number | string;
}

const ReviewCard = (props: ReviewCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="flex gap-3 border border-gray-200 rounded-2xl p-4">
      <div className="w-12 h-12 overflow-hidden rounded-full shrink-0">
        <img src={props.userImage} className="w-full h-full object-cover object-center" />
      </div>

      <div className="flex-1">
        <p className="font-medium">{props.userName}</p>

        <div className="flex items-center gap-2 mb-1">
          <ReviewStar rating={props.rating} size={'w-3 h-3'} />
          <p className="text-xs text-gray-600">{dayjs(props.createdAt).format('YYYY.MM.DD')}</p>
        </div>

        <p
          className={`text-gray-700 text-sm leading-relaxed transition-all ${
            expanded ? 'whitespace-pre-line' : 'line-clamp-2 whitespace-normal'
          }`}
        >
          {props.content}
        </p>
        {props.content.length > 50 && (
          <button
            className="text-xs text-blue-600 font-medium mt-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '접기 ▲' : '더보기 ▼'}
          </button>
        )}
        <div className="mt-3 flex gap-2 items-center">
          <ThumbUpIcon className="h-4 w-4 text-gray-500" />
          <p className="text-xs text-gray-500">{props.likes}</p>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
