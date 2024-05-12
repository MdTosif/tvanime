"use client";
import { IAnimeEpisode } from "@consumet/extensions";
import { useEffect } from "react";

export default function EpisodeList({
  episodes,
}: {
  episodes?: IAnimeEpisode[];
}) {
  useEffect(() => {
    global?.window.localStorage.setItem(window.location.href, "visited");
  }, []);
  return (
    <>
      {episodes?.map &&
        episodes?.map((e) => (
          <div
            key={e.id}
            onClick={() => {
              window.open(`?episodeId=${e.id}`, "_self");
            }}
          >
            {global?.window && (
              <button
                className={`btn btn-primary btn-lg ${
                  window.localStorage.getItem(
                    window.location.origin +
                      window.location.pathname +
                      "?episodeId=" +
                      e.id,
                  ) && "bg-secondary"
                } ${
                  window.location.origin +
                    window.location.pathname +
                    "?episodeId=" +
                    e.id ===
                    window.location.href && "bg-accent"
                }`}
              >
                {e.number.toString()}
              </button>
            )}
          </div>
        ))}
    </>
  );
}
