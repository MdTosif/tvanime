import { Button } from "@chakra-ui/button";
import { IVideo } from "@consumet/extensions";
import Head from "next/head";
import Link from "next/link";

export default function EpisodeStreams({
  videos,
  searchParams,
  params,
}: {
  videos: IVideo[];
  params: { episode: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto ">
      <Head>
        <title>{params.episode}</title>
      </Head>
      <h2 className="">MX Player: </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {videos.map((data, idx) => {
          return (
            <Link
              href={`intent:${data.url}#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end`}
              key={idx}
            >
              <Button className=" p-4  w-full" size="xl">
                <p className="font-bold p-2 text-xl text-center">
                  {data.quality}
                </p>
              </Button>
            </Link>
          );
        })}
      </div>
      <h2 className="">PC: </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {videos.map((data, idx) => {
          return (
            <Link
              href={`https://anym3u8player.com/tv/video-player.php?url=${data.url}`}
              key={idx}
            >
              <Button className=" p-4  w-full" size="xl">
                <p className="font-bold p-2 text-xl text-center ">
                  {data.quality}
                </p>
              </Button>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
