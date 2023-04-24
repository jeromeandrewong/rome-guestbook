import { clsx } from "clsx";

type spinnerSize = "large" | "small";

interface Props {
  size?: spinnerSize;
}

export const LoadingSpinner = ({ size = "small" }: Props) => {
  return (
    <div>
      <div className="relative flex w-10 justify-between">
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_infinite] rounded-full bg-slate-50"></div>
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_0.1625s_infinite] rounded-full bg-slate-50"></div>
        <div className="block h-2 w-2 animate-[pulse2_1.3s_ease-in-out_0.39s_infinite] rounded-full bg-slate-50"></div>
      </div>
    </div>
    //   className={clsx(
    //     // "animate-[spin_1000ms_ease_infinite] rounded-full border-4 border-slate-50/25 border-l-slate-50 border-r-slate-50",
    //     "relative before:absolute before:left-0 before:top-0 before:h-full before:w-full before:scale-0 before:animate-[pulsar_1.5s_ease-in-out_infinite] before:rounded-full before:bg-slate-50 after:absolute after:left-0 after:top-0 after:h-full after:w-full after:scale-0 after:animate-[pulsar_1.5s_ease-in-out_-0.75s_infinite] after:rounded-full after:bg-slate-50",
    //     size === "small" && "h-8 w-8",
    //     size === "large" && "h-32 w-32"
    //   )}
    // />
  );
};

export const LoadingPage = () => {
  return (
    <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center">
      <LoadingSpinner size={"large"} />
    </div>
  );
};
