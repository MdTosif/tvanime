import {
  ANIME,
  ISubtitle,
  IVideo,
  MOVIES,
  StreamingServers,
} from "@consumet/extensions";
import { Cacheable } from "typescript-cacheable";

let anime = new MOVIES.Goku();

class TV {
  private static instance: TV;
  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getAnimes(name: string, page: number = 1) {
    let res = await anime.search(name, page);
    return res;
  }

  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getEpisode(id: string, mediaId: string) {
    console.log(id, mediaId);
    
    let sauce = await Promise.allSettled([
      anime.fetchEpisodeSources(id, mediaId),
    ]);
    let videos: IVideo[] = [];    
    let subs: ISubtitle[] = [];
    sauce.forEach((e) => {
      
      if (e?.status === "fulfilled") {
        console.log(e);
        videos.push(...e.value.sources);
      }
    });
    return { videos };
  }

  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getEpisodes(id: string) {
    return anime.fetchMediaInfo(id);
  }

  public static getInstance(): TV {
    if (!TV.instance) {
      TV.instance = new TV();
    }
    return TV.instance;
  }
}

export const tvCache = TV.getInstance();
