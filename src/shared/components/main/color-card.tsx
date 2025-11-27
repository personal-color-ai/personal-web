import defaultImg from '@assets/default.png';

interface ColorCardProps{
  imgUrl:string;
  name:string;
}

const ColorCard = ({imgUrl, name}: ColorCardProps) => {
  return (
    <div>
      <div className="flex flex-col items-center gap-3 border border-gray-200 rounded-xl p-3 cursor-pointer">
        <div className="w-16 h-16 overflow-hidden rounded-md">
          <img src={imgUrl? imgUrl: defaultImg}/>
        </div>
        <p className="w-20 text-center">{name}</p>
      </div>
    </div>
  );
};

export default ColorCard;