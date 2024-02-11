"use client";
import { Button } from "@chakra-ui/button";
import { IAnimeInfo } from "@consumet/extensions";
import Head from "next/head";
import Link from "next/link";
import ThemeToggle from "whichanime/components/themeToggle";

export default function AnimeEpisode({
  animeInfo,
}: {
  animeInfo: IAnimeInfo;
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  return (
    <div className="m-2 container mx-auto ">
      <Head>
        <title>{animeInfo.title.toString()}</title>
      </Head>
      <ThemeToggle />
      <div className="my-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
        {animeInfo?.episodes?.map((data, idx) => {
          return (
            <Link href={`/stream/${data.id}`} key={idx}>
              <Button key={idx} className="w-full" variant="outline" size="lg">
                <p className="font-bold text-lg">{data.number}</p>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
