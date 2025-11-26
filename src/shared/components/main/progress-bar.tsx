interface ProgressBarProps {
  title: string;
  percent: number;
}

const ProgressBar = ({ title, percent = 0 }: ProgressBarProps) => {
  return (
    <div className="flex items-center gap-2">
      <p>{title}점</p>
      <div className="flex-1 h-1.5 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-400 to-pink-400"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
