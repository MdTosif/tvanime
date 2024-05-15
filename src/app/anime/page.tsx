import { animeCache } from "whichanime/utils/anime";
import Link from "next/link";
import SearchAnimeInput from "./_components/search";
import AnimeList from "./_components/anime-list";
import IconNext from "whichanime/components/icon-next";
import IconPrev from "whichanime/components/icon-prev";

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
        <div className="col-span-12 flex flex-row gap-2">
          <div className="flex-grow">
            <SearchAnimeInput searchTerm={searchParams?.search} />
          </div>
          <div className="flex flex-row gap-2 justify-between">
            <Link href={`?search=${searchParams?.search}&page=` + (page - 1)}>
              <button className="btn btn-primary btn-md">
                <IconPrev />
              </button>
            </Link>
            <Link href={`?search=${searchParams?.search}&page=` + (page + 1)}>
              <button className="btn btn-primary btn-md">
                <IconNext />
              </button>
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
