import { animeCache } from "whichanime/utils/anime";
import Link from "next/link";
import AnimeList from "./_components/anime-list";
import IconNext from "whichanime/components/icon-next";
import IconPrev from "whichanime/components/icon-prev";
import IconSearch from "whichanime/components/search-icon";
import { redirect } from "next/navigation";
import Head from "next/head";
import { ResolvingMetadata, Metadata } from "next";

export async function generateMetadata({
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}): Promise<Metadata> {
  return {
    title: `Tv Anime | ${searchParams?.search}`,
    description: `watch anime ad free without interruption`,
  };
}

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
  async function serveraction(data: FormData) {
    "use server";
    redirect("?search=" + data.get("search"));
  }
  return (
    <>
      <div className="grid grid-cols-12 gap-6 m-4">
        <div className="col-span-12 flex flex-row gap-2">
          <div className="flex-grow">
            <form action={serveraction}>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Search"
                  name="search"
                  value={searchParams?.search}
                />
                <IconSearch />
              </label>
            </form>
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
