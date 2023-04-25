import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import "@fontsource/jetbrains-mono";

import { api } from "npm/utils/api";

import "npm/styles/globals.css";
import Head from "next/head";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Rome&apos;s Guestbook</title>
        <meta
          name="description"
          content="unoriginal Guestbook application made my @jeromeandrewong"
        />
        <link className="rounded-full" rel="shortcut icon" href="icon.png" />
      </Head>
      <main>
        <Component {...pageProps} />
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
