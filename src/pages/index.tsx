import { type NextPage } from "next";

import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "npm/utils/api";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <main>Loading...</main>;
  }
  return (
    <>
      <main className="flex h-screen justify-center">
        <div className="mx-10 flex h-full w-full flex-col items-center p-5 md:max-w-2xl">
          <h1 className="pt-4 text-2xl">
            Rome&apos;s unoriginal{" "}
            <span className="text-purple-500">Guestbook </span>
          </h1>
          <div className="flex w-full flex-col items-center pt-5">
            {session ? (
              <>
                <p>hi {session.user?.name}</p>
                <button
                  className="flex cursor-default select-none items-center rounded-[0.2rem]  border-zinc-700 px-3 py-1.5 text-sm font-medium outline-none   hover:bg-zinc-700 data-[state=open]:bg-zinc-700"
                  onClick={() => {
                    signOut().catch(console.log);
                  }}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="flex cursor-default select-none items-center rounded-md border border-zinc-800 px-3 py-1.5 text-sm font-medium outline-none  hover:bg-zinc-700 "
                  onClick={() => {
                    signIn("discord").catch(console.log);
                  }}
                >
                  Login with Discord
                </button>
                <div>
                  {" "}
                  <GuestbookEntries />{" "}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
const GuestbookEntries = () => {
  const { data: guestbookEntries, isLoading } = api.guestbook.getAll.useQuery();

  if (isLoading) {
    return <div>Fetching messages...</div>;
  }

  return (
    <div className="flex flex-col gap-4">
      {guestbookEntries?.map((entry, index) => (
        // <div key={index}>
        //   <p>{entry.message}</p>
        //   <span>- {entry.name}</span>
        // </div>
        <div className="mt-2" key={index}>
          <div className="w-full rounded-lg border-b border-zinc-500 bg-gradient-to-r from-zinc-500 to-stone-500 p-1 shadow-sm  shadow-purple-500/10 duration-300 hover:scale-[101%] hover:shadow-lg  hover:shadow-purple-500/10">
            <div className="flex h-full w-full cursor-pointer flex-col justify-between gap-3 rounded-lg bg-zinc-800 p-4">
              {" "}
              <div className="flex gap-3">
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
