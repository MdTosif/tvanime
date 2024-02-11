import { Metadata, ResolvingMetadata } from "next";

import { animeCache } from "whichanime/utils/anime";
import EpisodeStreams from "./page-client";

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { episode: string };
    searchParams: { [key: string]: string | string[] | undefined };
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.episode;

  return {
    title: id,
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { episode: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let res = await animeCache.getEpisode(params.episode);
  console.log(res);

  if (!res) {
    return <>no data</>;
  }
  return (
    <EpisodeStreams
      videos={res.videos}
      searchParams={searchParams}
      params={params}
    />
  );
}
