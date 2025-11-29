import {useState, useRef, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import SearchIcon from '@assets/search.svg?react';
import StatIcon from '@assets/star.svg?react';
import PromptIcon from '@assets/prompt.svg?react';
import CheckIcon from '@assets/check.svg?react';
import CancelIcon from '@assets/cancel.svg?react';
import {Card, CardContent} from '@components/main/card-item';
import { ImageWithFallback } from '@components/main/image-with-fallback';
import {useInfiniteProductList} from '../../hooks/useInfiniteProductList';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ProductInfo} from '@types/product';
import { useGetProductPrompt } from '../../hooks/useGetProductPrompt';

const MainPage = () => {
  const [colorType, setColorType] = useState<string>("가을 웜 뮤트");
  const [recommended, setRecommended] = useState<string>("");
  const [isPromptOpen, setIsPromptOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const memberId = 1;

  const observerTargetRef = useRef<HTMLDivElement>(null);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteProductList({
    'member-id': memberId,
    size: 10,
  });
  const {data: promptData, refetch} = useGetProductPrompt({
    'member-id': memberId,
    prompt: recommended,
    size: 10,
  })

  const products = data?.pages.flatMap(page => page.result?.list || []) || [];

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    if (!observerTargetRef.current) return;
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      // 관찰 대상이 뷰포트에 들어왔고, 다음 페이지가 있으면 데이터를 불러옵니다.
      if (target.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    const observer = new IntersectionObserver(observerCallback, {
      root: null,
      rootMargin: '100px',
      threshold: 0.1,
    });

    observer.observe(observerTargetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const convertScore = (origin: number) => {
    const scoreOutOf5 = (origin / 100) * 5;
    return Math.round(scoreOutOf5 * 10) / 10;
  }

  const onClickRecommended = () => {
    console.log("프롬프팅", promptData)
  }
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 to-violet-50">
      <div className="bg-white w-full px-8 p-6 border-b-1 border-gray-100">
        <div className="flex flex-col items-center gap-3">
          <p className="text-black text-base font-medium text-center">피팅룸</p>
          <div
            className="w-30 h-6 bg-gradient-to-r from-purple-600 via-fuchsia-600 to-pink-600 rounded-md inline-flex justify-center items-center gap-2.5">
            <p className="justify-start text-white text-xs">{colorType}</p>
          </div>
          <div className="w-full h-12 bg-gray-50 flex items-center gap-2 rounded-xl px-1.5">
            <SearchIcon />
            <input className="outline-none w-full bg-gray" placeholder="제품 검색하기" />
          </div>
        </div>
      </div>
      <div className="p-8">
        <p className=" text-black text-lg font-semibold mb-5">당신을 위한 추천 제품</p>
        <div className="grid grid-cols-2 gap-3">
          {isLoading && (
            Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="w-full h-60 aspect-square bg-gray-200 animate-pulse rounded-md"
              />
            ))
          )}
          {products.map((product: ProductInfo, idx) => (
            <Card
              key={idx}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => {
                navigate(`/product/${product.id}`)
              }}
            >
              <CardContent className="p-0">
                <div className="aspect-square bg-gray-100 relative">
                  <ImageWithFallback
                    src={product?.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3 space-y-1">
                  <p className="text-xs text-gray-700">{product.brand}</p>
                  <p className="text-sm line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1">
                    <StatIcon className="h-3 w-3 text-yellow-400" />
                    <span className="text-xs">
                        {convertScore(product.rating)}
                      </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        {hasNextPage && (
          <div
            ref={observerTargetRef}
            className="text-center p-6"
          >
            {isFetchingNextPage && <p className="text-sm text-pink-500">추가 제품 로딩 중...</p>}
          </div>
        )}
        {!hasNextPage && (
          <div className="text-center p-6 text-gray-500 text-sm">
            더 이상 추천할 제품이 없습니다.
          </div>
        )}
        <div
          className="fixed z-50 bottom-40 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
        >
          {/* 안내 텍스트 */}
          <p
            className={`
      bg-fuchsia-50 rounded-3xl shadow-[0px_8px_24px_0px_rgba(0,0,0,0.15)] p-3 px-8 text-l
      transform transition-all duration-500 ease-out
      ${isPromptOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
    `}
            style={{ transitionDelay: '0ms' }}
          >
            상품 추천을 받아보세요
          </p>
          <div className="flex gap-2">
            {/* 추천받기 버튼 */}
            <button
              onClick={onClickRecommended}
              className={`
      flex items-center gap-1 p-3 px-4 bg-pink-500 rounded-3xl shadow-lg cursor-pointer
      transform transition-all duration-500 ease-out
      ${isPromptOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
    `}
              style={{ transitionDelay: '100ms' }}
            >
              <CheckIcon className="w-5 h-5" />
              <p className="text-l text-white">추천</p>
            </button>

            {/* 닫기 버튼 */}
            <button
              onClick={() => setIsPromptOpen(false)}
              className={`
      flex items-center gap-1 p-2 px-4 bg-zinc-700 rounded-3xl shadow-lg cursor-pointer
      transform transition-all duration-500 ease-out
      ${isPromptOpen ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
    `}
              style={{ transitionDelay: '200ms' }}
            >
              <CancelIcon className="w-5 h-5" />
              <p className="text-l text-white">닫기</p>
            </button>
          </div>


        </div>


        <button
          onClick={() => setIsPromptOpen(!isPromptOpen)}
          className={`
    fixed z-50
    rounded-full cursor-pointer
    transition-all duration-500 ease-in-out
    bottom-6
    left-1/2
    transform
    ${!isPromptOpen ? 'translate-x-[100px] scale-100' : '-translate-x-1/2 scale-125'}
  `}
        >
          <PromptIcon />
        </button>

      </div>
      {isPromptOpen && (
        <div
          className="
      fixed inset-0
      bg-pink-200/40
      backdrop-blur-md
      z-40
      transition-opacity duration-300
    "
        >
          <div className="max-w-md mx-auto px-10 h-1/4">
            <textarea
              placeholder="지속력 좋은 틴트 추천해줘"
              value={recommended}
              onChange={(e) => setRecommended(e.target.value)}
              className="w-full h-full bg-none outline-none text-center mt-60 resize-none text-xl" />
          </div>
        </div>
      )}
    </div>
  );
};

export default MainPage;