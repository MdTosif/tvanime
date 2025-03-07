import Image from "next/image";
import { animeCache } from "whichanime/utils/anime";
import VimePlayer from "./_component/player";
import EpisodeList from "./_component/episode-list";
import { redirect } from "next/navigation";
import { Metadata } from "next/types";

export async function generateMetadata({
  params,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  return {
    title: `Tv Anime | ${params.id}`,
    description: `watch anime ad free without interruption`,
  };
}

export default async function Home({
  params,
  searchParams,
}: {
  params: { id: string; episodeId?: string };
  searchParams?: { page: string; search?: string; episodeId?: string };
}) {
  const anime = await animeCache.getEpisodes(params.id);
  const episodes = anime?.episodes?.[0]?.id
    ? await animeCache.getEpisode(
        searchParams?.episodeId || anime?.episodes?.[0]?.id,
      )
    : undefined;

  async function serveraction(params: FormData) {
    "use server";
    redirect(`?episodeId=${params.get("episode")}`);
  }

  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <Image src={anime.image as string} alt="Shoes" fill />
        </figure>
        <div className="card-body bg-primary">
          <h2 className="card-title text-purple-500">
            {anime.title.toString()}
          </h2>
          <p>
            <span className="text-white">Description: </span>
            {anime.description}
          </p>
          <p>
            <span className="text-white">Genre: </span>
            {anime.genres?.join(", ")}
          </p>
          <p>
            <span className="text-white">Release Date: </span>
            {anime.releaseDate}
          </p>
          <p>
            <span className="text-white">Status: </span>
            {anime.status}
          </p>
          <p>
            <span className="text-white">Total Episode: </span>
            {anime.totalEpisodes}
          </p>
          <p>
            <span className="text-white">Language: </span>
            {anime.subOrDub}
          </p>
          {episodes?.videos.length && (
            <VimePlayer thumbnail={anime.image} vidSrc={episodes?.videos} />
          )}

          <form
            action={serveraction}
            className="card-actions bg-accent-content p-4 rounded-lg shadow-lg"
          >
            <EpisodeList episodes={anime.episodes} />
          </form>
        </div>
      </div>
    </>
  );
}
