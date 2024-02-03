import Link from "next/link";
import { getAnimes } from "whichanime/utils/anime";


export default async function Home({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams: { [key: string]: string | string[] | undefined }
}) {

  let res = await getAnimes(searchParams["search"] as string)


  if (!res) {
    return <>no data</>
  }
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {res.results.map((data, idx) => {
          return (
            <Link href={`/anime/${data.id}`}  key={idx} >
              <div style={{ backgroundImage: `url(${data.image})` }}>
                <div className=" p-4 rounded shadow-md h-44 bg-black bg-opacity-40"  >
                  <p className="font-bold text-lg p-2">{data.title.toString()}</p>

                </div>
              </div></Link>
          )
        })}
      </div>
    </div>
  );
}