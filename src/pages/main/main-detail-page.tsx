import {useParams, useNavigate} from 'react-router-dom';
import {useGetProductDetail} from '../../hooks/useGetProductDetail';
import { useGetProductReview } from '../../hooks/useGetProductReview';
import BackIcon from '@assets/back.svg?react';
import StarIcon from "@assets/star.svg?react";
import ColorCard from '@components/main/color-card';
import ProgressBar from '@components/main/progress-bar';
import { Button } from '@components/main/button';
import ReviewStar from '@components/main/review-star';
import ReviewCard from '@components/main/review-card';

interface Review {
  name: string;
  percent: number | undefined;
}

const MainDetailPage = () => {
  const navigate = useNavigate();
  const {id} = useParams();

  const {data} = useGetProductDetail(Number(id));
  const {data:reviewDataApi} = useGetProductReview(Number(id));
  const detailData = data?.result;
  const reviewData: Review[] = [
    {name:'5', percent: detailData?.reviewCountFive},
    {name:'4', percent: detailData?.reviewCountFour},
    {name:'3', percent: detailData?.reviewCountThree},
    {name:'2', percent: detailData?.reviewCountTwo},
    {name:'1', percent: detailData?.reviewCountOne},
  ]

  console.log("리뷰데이터" , reviewDataApi?.result);

  const convertScore = (origin: number | undefined) => {
    if(origin != undefined){
      const scoreOutOf5 = (origin / 100) * 5;
      return Math.round(scoreOutOf5 * 10) / 10;
    }
    return 0;
  }
  const onClickBuy = () => {
    window.open(detailData?.originUrl)
  }

  const convertReview = (origin: number | undefined) => {
    if (!origin || !detailData?.reviewCountAll) return 0;
    return (origin / detailData.reviewCountAll) * 100;
  };

  return (
    <div className="h-dvh">
      <div className="p-6">
        <div onClick={() => {
          navigate(-1);
        }}>
          <BackIcon className="cursor-pointer" />
        </div>
      </div>
      <div className="w-full h-110 overflow-hidden mb-5">
        <img src={detailData?.imageUrl} />
      </div>
      <div className="px-3 flex flex-col gap-2 mb-5">
        <p>{detailData?.brand}</p>
        <p className="text-lg font-bold">{detailData?.name}</p>
        <div className="flex gap-2">
          <div className="flex gap-1">
            <StarIcon className="text-yellow-400" />
            <p>{convertScore(detailData?.rating)}</p>
          </div>
          <p className="text-gray-600">리뷰 {detailData?.reviewCountAll}</p>
        </div>

        <p className="text-lg">{detailData?.price.toLocaleString()} 원</p>
      </div>
      <div className="px-3">
        <div className="w-full px-3 h-[1px] bg-gray-200 "></div>
        <div className="flex flex-col gap-2 mt-3">
          <p className="pl-1">색상보기</p>
          <div className="w-full overflow-hidden overflow-x-auto px-3 flex gap-4">
            {detailData?.options.map((option) => (
              <ColorCard imgUrl={option.imageUrl} name={option.name} />
            ))}
          </div>
        </div>
        <p className="mt-6 pl-1">리뷰</p>
        <div className="flex gap-9 items-center bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-2xl mt-2 border border-[#E3DAE0]">
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl">{convertScore(detailData?.rating)}</p>
            <ReviewStar rating={convertScore(detailData?.rating)} size="w-2.5 h-2.5" />
            <p>{detailData?.reviewCountAll}개 리뷰</p>
          </div>
          <div className="flex-1">
            {reviewData.map((option, idx) => (
              <ProgressBar key={idx} percent={convertReview(option.percent)} title={option.name} />
            ))}
          </div>
        </div>
        <div className="mt-5 flex flex-col gap-4">
          {reviewDataApi?.result.map((data) => (
            <ReviewCard {...data}/>
          ))}

        </div>
        <div className="w-full h-20"></div>
        <div className="fixed bottom-5 left-0 right-0 bg-white  max-w-md mx-auto">
          <Button
            onClick={onClickBuy}
            className="flex-1 w-full h-12 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
          >
            구매하러가기
          </Button>
        </div>
      </div>
    </div>

  );
};

export default MainDetailPage;