import { api } from "npm/utils/api";
import { LoadingSpinner } from "./LoadingSpinner";

export const GuestbookEntries = () => {
  const { data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();
  if (isLoading) {
    return (
      <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex  flex-col gap-1">
      {guestbookEntries?.map((entry, index) => (
        <div className="mt-2" key={index}>
          <div className="w-full rounded-lg border-b border-zinc-500 bg-gradient-to-r from-zinc-500 to-stone-500 p-1 shadow-sm  shadow-purple-500/10 duration-300 hover:scale-[101%] hover:shadow-lg  hover:shadow-purple-500/10">
            <div className="flex h-full w-full cursor-pointer flex-col justify-between gap-3 rounded-lg bg-zinc-800 px-3 py-2">
              {" "}
              <div className="flex flex-col gap-1">
                <span className="text-purple-500">@{entry.name}:</span>
                <p>{entry.message}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
