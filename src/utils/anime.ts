import { ANIME, StreamingServers } from "@consumet/extensions";

let anime = new ANIME.Gogoanime();

export function getAnimes(name:string, page?:number){
    return anime.search(name, page)
}

export function getEpisodes(id:string){
    return anime.fetchAnimeInfo(id)
}

export async function getEpisode(id:string){
    return [
        ...(await anime.fetchEpisodeSources(id, StreamingServers.GogoCDN)).sources,
        ...(await anime.fetchEpisodeSources(id, StreamingServers.Filemoon)).sources,
        ...(await anime.fetchEpisodeSources(id, StreamingServers.VidCloud)).sources
        ]
}