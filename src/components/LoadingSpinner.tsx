export const LoadingSpinner = () => {
  return (
    <div>
      <div className="relative flex w-10 justify-between">
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_infinite] rounded-full bg-slate-50"></div>
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_0.1625s_infinite] rounded-full bg-slate-50"></div>
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_0.39s_infinite] rounded-full bg-slate-50"></div>
      </div>
    </div>
  );
};
