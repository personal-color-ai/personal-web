interface ChipsProps {
  name: string;
}

const Chips = ({ name }: ChipsProps) => {
  return (
    <div className="p-1 px-3 rounded-xl border border-1 border-gray-300 text-xs">
      <p className="w-full whitespace-nowrap">{name}</p>

    </div>
  );
};

export default Chips;