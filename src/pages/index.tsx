import { type NextPage } from "next";
import { useState } from "react";
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
              <div className="w-[30vh]">
                <div className="mb-5 flex items-center justify-between">
                  <p>
                    Welcome{" "}
                    <span className="text-purple-500">
                      @{session.user?.name}
                    </span>
                  </p>
                  <button
                    className="flex cursor-default select-none items-center rounded-md border border-red-800 px-3 py-2 text-sm font-medium outline-none hover:bg-zinc-800 focus:ring-2 focus:ring-red-500"
                    onClick={() => {
                      signOut().catch(console.log);
                    }}
                  >
                    Logout
                  </button>
                </div>
                <div>
                  <Form />
                </div>
              </div>
            ) : (
              <>
                <button
                  className="flex cursor-default select-none items-center rounded-md border border-green-800 px-3 py-2 text-sm font-medium outline-none hover:bg-zinc-800 focus:ring-2 focus:ring-green-500"
                  onClick={() => {
                    signIn("discord").catch(console.log);
                  }}
                >
                  Login with Discord
                </button>
              </>
            )}
            <div
              className="pt-5
            "
            >
              {" "}
              <GuestbookEntries />{" "}
            </div>
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
    <div className="flex flex-col gap-1">
      {guestbookEntries?.map((entry, index) => (
        <div className="mt-2" key={index}>
          <div className="w-full rounded-lg border-b border-zinc-500 bg-gradient-to-r from-zinc-500 to-stone-500 p-1 shadow-sm  shadow-purple-500/10 duration-300 hover:scale-[101%] hover:shadow-lg  hover:shadow-purple-500/10">
            <div className="flex h-full w-full cursor-pointer flex-col justify-between gap-3 rounded-lg bg-zinc-800 px-3 py-2">
              {" "}
              <div className="flex w-[28vh] flex-col gap-1">
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

const Form = () => {
  const [message, setMessage] = useState("");
  const { data: session, status } = useSession();
  const utils = api.useContext();
  const postMessage = api.guestbook.postMessage.useMutation({
    onMutate: async (newEntry) => {
      await utils.guestbook.getAll.cancel();
      utils.guestbook.getAll.setData(undefined, (prevEntries) => {
        if (prevEntries) {
          return [newEntry, ...prevEntries];
        } else {
          return [newEntry];
        }
      });
    },
    onSettled: async () => {
      await utils.guestbook.getAll.invalidate();
    },
  });

  if (status !== "authenticated") return null;

  return (
    <form
      className="flex gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        postMessage.mutate({
          name: session.user?.name as string,
          message,
        });
        setMessage("");
      }}
    >
      <div className="relative flex-grow bg-zinc-900 text-zinc-50">
        <input
          className="peer h-10 w-full rounded-lg  border border-zinc-800 bg-transparent px-2 placeholder-transparent ring-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          type="text"
          name="message"
          id="message"
          placeholder="Write something!"
          minLength={2}
          maxLength={100}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <label
          className="absolute -top-3 left-0 mx-1 cursor-text bg-inherit px-1 text-sm text-zinc-500 peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:transition-all peer-focus:-top-3 peer-focus:text-sm peer-focus:text-zinc-400"
          htmlFor="message"
        >
          Write something!
        </label>
      </div>
      <button
        type="submit"
        className="flex cursor-default select-none items-center rounded-md border border-zinc-800 px-3 py-2 text-sm font-medium outline-none hover:bg-zinc-800 focus:ring-2 focus:ring-zinc-500"
      >
        Submit
      </button>
    </form>
  );
};
