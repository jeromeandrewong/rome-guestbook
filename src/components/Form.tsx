import { useSession } from "next-auth/react";
import { api } from "npm/utils/api";
import { useState } from "react";

export const Form = () => {
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
