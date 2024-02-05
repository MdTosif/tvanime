import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import Link from "next/link";
import { animeCache } from "whichanime/utils/anime";

export async function generateMetadata(
  {
    params,
    searchParams,
  }: {
    params: { episode: string };
    searchParams: { [key: string]: string | string[] | undefined };
  },
  parent: ResolvingMetadata
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
    <div className="container mx-auto bg-primary">
      <Head>
        <title>{params.episode}</title>
      </Head>
      <h2 className="text-accent">MX Player: </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {res.videos.map((data, idx) => {
          return (
            <Link
              href={`intent:${data.url}#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end`}
              key={idx}
            >
              <div className=" p-4 rounded shadow-md bg-gray-50 bg-opacity-40 text-accent border border-accent">
                <p className="font-bold p-2 text-xl text-center">
                  {data.quality}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      <h2 className="text-accent">PC: </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {res.videos.map((data, idx) => {
          return (
            <Link
              href={`https://anym3u8player.com/tv/video-player.php?url=${data.url}`}
              key={idx}
            >
              <div className=" p-4 rounded shadow-md bg-gray-50 bg-opacity-40 border border-accent">
                <p className="font-bold p-2 text-xl text-center text-accent">
                  {data.quality}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
