import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { animeCache } from "whichanime/utils/anime";
import AnimeEpisode from "./page-client";

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  // read route params
  const id = params.name;

  return {
    title: id,
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { name: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let res = await animeCache.getEpisodes(params.name);

  if (!res) {
    return <>no data</>;
  }

  return <AnimeEpisode animeInfo={res} searchParams={searchParams} />;
}
