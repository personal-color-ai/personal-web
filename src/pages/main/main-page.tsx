import {useState} from 'react';
import SearchIcon from '@assets/search.svg?react';
import {Card, CardContent} from '@components/main/card-item';
import { ImageWithFallback } from '@components/main/image-with-fallback';
import {useInfiniteProductList} from '../../hooks/useInfiniteProductList';

interface Product {
  id: string;
  brand: string;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  colorShade?: string;
}

// Mock product data
const recommendedProducts: Product[] = [
  {
    id: '1',
    brand: '클리오',
    name: '프리즘 하이라이터',
    image: 'makeup highlighter',
    rating: 4.8,
    reviewCount: 234,
    colorShade: '04 그레이스 오팔'
  },
  {
    id: '2',
    brand: '에뛰드',
    name: '러블리 쿠키 블러셔',
    image: 'makeup blush',
    rating: 4.8,
    reviewCount: 156,
    colorShade: 'PP501 라벤더챠프 케이크'
  },
  {
    id: '3',
    brand: '롬앤',
    name: '쥬시 래스팅 틴트',
    image: 'lip tint',
    rating: 4.7,
    reviewCount: 892,
    colorShade: '06 피그피그'
  },
  {
    id: '4',
    brand: '헤라',
    name: '센슈얼 파우더 매트',
    image: 'lipstick matte',
    rating: 4.9,
    reviewCount: 445,
    colorShade: '421 로즈테라피'
  },
  {
    id: '4',
    brand: '헤라',
    name: '센슈얼 파우더 매트',
    image: 'lipstick matte',
    rating: 4.9,
    reviewCount: 445,
    colorShade: '421 로즈테라피'
  },{
    id: '4',
    brand: '헤라',
    name: '센슈얼 파우더 매트',
    image: 'lipstick matte',
    rating: 4.9,
    reviewCount: 445,
    colorShade: '421 로즈테라피'
  },{
    id: '4',
    brand: '헤라',
    name: '센슈얼 파우더 매트',
    image: 'lipstick matte',
    rating: 4.9,
    reviewCount: 445,
    colorShade: '421 로즈테라피'
  }
];

const MainPage = () => {
  const [colorType, setColorType] = useState<string>("가을 웜 뮤트");

  const memberId = 1;

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteProductList({
    memberId,
    size: 10,
    page: 0
  });

  console.log(data);

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
          {recommendedProducts.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => 2}
            >
              <CardContent className="p-0">
                {/* Product Image */}
                <div className="aspect-square bg-gray-100 relative">
                  <ImageWithFallback
                    src={`https://source.unsplash.com/300x300/?${product.image}`}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Product Info */}
                <div className="p-3 space-y-1">
                  {product.colorShade && (
                    <p className="text-xs text-gray-500">{product.colorShade}</p>
                  )}
                  <p className="text-xs text-gray-700">{product.brand}</p>
                  <p className="text-sm line-clamp-2">{product.name}</p>
                  <div className="flex items-center gap-1">
                    {/*<Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />*/}
                    <span className="text-xs">
                        {product.rating}
                      <span className="text-gray-400">({product.reviewCount})</span>
                      </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MainPage;