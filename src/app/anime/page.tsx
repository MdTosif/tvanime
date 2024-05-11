import { animeCache } from "whichanime/utils/anime";
import Link from "next/link";
import SearchAnimeInput from "./_components/search";
import AnimeList from "./_components/anime-list";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams?: { page: string; search?: string };
}) {
  const page = parseInt(searchParams?.page || "1");
  const searchResult = searchParams?.search
    ? await animeCache.getAnimes(searchParams.search, page)
    : await animeCache.getTrendingAnimes(page);
  return (
    <>
      <div className="grid grid-cols-12 gap-6 m-4">
        <div className="col-span-12 flex flex-row gap-6 justify-evenly">
          <div className="w-full">
            <SearchAnimeInput searchTerm={searchParams?.search} />
          </div>
          <div className="flex flex-row gap-6 justify-between">
            <Link href={"?page=" + (page + 1)}>
              <button className="btn btn-primary">Next</button>
            </Link>
            <Link href={"?page=" + (page - 1)}>
              <button className="btn btn-primary">Prev</button>
            </Link>
          </div>
        </div>
        <div className="col-span-12 ">
          <AnimeList animes={searchResult.results} />
        </div>
      </div>
    </>
  );
}
