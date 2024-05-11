import Image from "next/image";
import Link from "next/link";
import { animeCache } from "whichanime/utils/anime";
import VimePlayer from "./_component/player";

export default async function Home({
  params,
  searchParams,
}: {
  params: { id: string; episodeId?: string };
  searchParams?: { page: string; search?: string };
}) {
  const anime = await animeCache.getEpisodes(params.id);
  const episodes = anime?.episodes?.[0]?.id
    ? await animeCache.getEpisode(params.episodeId || anime?.episodes?.[0]?.id)
    : undefined;
  console.log(episodes);

  return (
    <>
      <div className="card w-full bg-base-100 shadow-xl image-full">
        <figure>
          <Image src={anime.image as string} alt="Shoes" layout="fill" />
        </figure>
        <div className="card-body ">
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
          <VimePlayer thumbnail={anime.image} vidSrc={episodes?.videos} />

          <div className="card-actions bg-accent-content p-4 rounded-lg shadow-lg">
            {anime.episodes?.map((e) => (
              <Link key={e.id} href={`?episodeId=${e.id}`}>
                <button className="btn btn-primary btn-lg">
                  {e.number.toString()}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
