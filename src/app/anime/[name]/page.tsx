import Head from "next/head";
import Link from "next/link";
import { animeCache } from "whichanime/utils/anime";


export default async function Home({
  params,
  searchParams,
}: {
  params: { name: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  let res = await animeCache.getEpisodes(params.name)


  if (!res) {
    return <>no data</>
  }

  return (
    <div className="container mx-auto">
      <Head>
        <title>${res.title.toString()}</title>
      </Head>
      <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-16 xl:grid-cols-32 gap-4">
        {res?.episodes?.map((data, idx) => {
          return (
            <Link href={`/stream/${data.id}`} key={idx}>
              <div className=" p-4 rounded shadow-md bg-gray-50 bg-opacity-40"  >
                <p className="font-bold p-2 text-3xl text-center">{data.number}</p>

              </div>
            </Link>
          )
        })}
      </div>
    </div>
  );
}