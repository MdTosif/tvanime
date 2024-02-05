import {
  ANIME,
  ISubtitle,
  IVideo,
  StreamingServers,
} from "@consumet/extensions";
import { Cacheable } from "typescript-cacheable";

let anime = new ANIME.Gogoanime();

class Anime {
  private static instance: Anime;
  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getAnimes(name: string, page: number = 1) {
    let res = await anime.search(name, page);
    return res;
  }

  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getEpisode(id: string) {
    let sauce = await Promise.allSettled([
      anime.fetchEpisodeSources(id),
      anime.fetchEpisodeSources(id, StreamingServers.StreamSB),
      anime.fetchEpisodeSources(id, StreamingServers.VidStreaming),
    ]);
    let videos: IVideo[] = [];
    let subs: ISubtitle[] = [];
    sauce.forEach((e) => {
      if (e?.status === "fulfilled") {
        videos.push(...e.value.sources);
      }
    });
    return { videos };
  }

  @Cacheable() // Set TTL to 5 minutes (60 seconds * 5 minutes)
  public async getEpisodes(id: string) {
    return anime.fetchAnimeInfo(id);
  }

  public static getInstance(): Anime {
    if (!Anime.instance) {
      Anime.instance = new Anime();
    }
    return Anime.instance;
  }
}

export const animeCache = Anime.getInstance();
