import {useState, useRef, useEffect} from 'react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import SearchIcon from '@assets/search.svg?react';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import StatIcon from '@assets/star.svg?react';
import {Card, CardContent} from '@components/main/card-item';
import { ImageWithFallback } from '@components/main/image-with-fallback';
import {useInfiniteProductList} from '../../hooks/useInfiniteProductList';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import {ProductInfo} from '@types/product';

const MainPage = () => {
  const [colorType, setColorType] = useState<string>("가을 웜 뮤트");
  const memberId = 1;

  const observerTargetRef = useRef<HTMLDivElement>(null);

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading} = useInfiniteProductList({
    'member-id': memberId,
    size: 10,
  });

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
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

  if (isLoading) {
    return <div className="text-center p-10">⏳ 제품 목록을 불러오는 중...</div>;
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
          {products.map((product: ProductInfo, idx: number) => (
            <Card
              key={idx}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => 2}
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
                        {product.rating}
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
        {!hasNextPage && products.length === 0 && (
          <div className="text-center p-6 text-gray-500 text-sm">
            더 이상 추천할 제품이 없습니다.
          </div>
        )}
      </div>

    </div>
  );
};

export default MainPage;