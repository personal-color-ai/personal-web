

interface ReviewStarProps {
  rating: number; // 1~5
  size?: string; // Optional Tailwind size
  color?: string; // Optional Tailwind color
}

import StarIcon from "@assets/star.svg?react";

const ReviewStar = ({ rating, size = "w-5 h-5", color = "text-yellow-400" }: ReviewStarProps) => {
  // 5개의 배열을 만들어 인덱스로 별을 채울지 결정
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex gap-0.5">
      {stars.map((num) => (
        <StarIcon
          key={num}
          className={`${size} ${
            num <= rating ? color : "text-gray-300"
          }`}
        />
      ))}
    </div>
  );
};

export default ReviewStar;
