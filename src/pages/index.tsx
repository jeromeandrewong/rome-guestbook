import { type NextPage } from "next";
import { signIn, signOut, useSession } from "next-auth/react";
import { GuestbookEntries } from "npm/components/GuestbookEntries";
import { Form } from "npm/components/Form";
import { LoadingSpinner } from "npm/components/LoadingSpinner";

const Home: NextPage = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="absolute right-0 top-0 flex h-screen w-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );
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
