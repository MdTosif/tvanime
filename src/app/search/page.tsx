import { animeCache } from "whichanime/utils/anime";
import SearchClient from "./page-client";

export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  let res = await animeCache.getAnimes(searchParams["search"] as string);

  if (!res) {
    return <>no data</>;
  }
  return <SearchClient animeSearchResult={res} searchParams={searchParams} />;
}
