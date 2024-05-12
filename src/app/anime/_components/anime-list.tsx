import { IAnimeResult } from "@consumet/extensions";
import Image from "next/image";
import Link from "next/link";

export default function AnimeList({ animes }: { animes: IAnimeResult[] }) {
  return (
    <>
      <div className="grid grid-cols-12 gap-4">
        {animes.map((anime: IAnimeResult & { genres?: string[] }) => (
          <>
            <Link
              href={`/anime/${anime.id}`}
              className="col-span-12 md:col-span-6 lg:col-span-3 card bg-base-100 shadow-xl image-full "
            >
              <figure>
                <Image
                  src={anime.image as string}
                  alt={anime.cover as string}
                  fill
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{anime.title.toString()}</h2>
                <p>
                  <span>Genre: </span>
                  {anime.genres?.join(", ")}
                </p>
                <div className="card-actions justify-end">
                  <button className="btn btn-primary">See Episodes</button>
                </div>
              </div>
            </Link>
          </>
        ))}
      </div>
    </>
  );
}
