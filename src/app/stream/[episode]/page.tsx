import Link from "next/link";
import { getEpisode } from "whichanime/utils/anime";


export default async function Home({
  params,
  searchParams,
}: {
  params: { episode: string }
  searchParams: { [key: string]: string | string[] | undefined }
}){
  
  let res = await getEpisode(params.episode)
  let pc = searchParams["pc"]
  // console.log(res);

  if (!res) {
    return <>no data</>
  }
  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {res.map((data, idx) => {
          return (
          <Link href={!pc ? `intent:${data.url}#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end` : `${data.url}`}  key={idx}>
            <div  className=" p-4 rounded shadow-md bg-gray-50 bg-opacity-40"  >
            <p className="font-bold p-2 text-xl text-center">{data.quality}</p>
           
          </div>
          </Link>
          )
        })}
      </div>
    </div>
  );
}