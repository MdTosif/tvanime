"use client";
import { IVideo } from "@consumet/extensions";
import { Player, DefaultUi, Hls } from "@vime/react";
import { useEffect, useRef, useState } from "react";

export default function VimePlayer({
  thumbnail,
  vidSrc,
}: {
  thumbnail?: string;
  vidSrc?: IVideo[];
}) {
  // Obtain a ref if you need to call any methods.
  const [src, setSrc] = useState("");

  useEffect(() => {
    console.log(src);
  }, [src]);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 bg-primary-content p-4 rounded-lg shadow-lg">
        <div className="col-span-11">
          <Player>
            {/* Provider component is placed here. */}
            <Hls version="latest" poster={thumbnail}>
              <source data-src={src} type="application/x-mpegURL" />
            </Hls>
            <DefaultUi></DefaultUi>
          </Player>
        </div>
        <div className="col-span-1">
          <div className="flex flex-col gap-4">
            {vidSrc?.map &&
              vidSrc?.map((e) => (
                <button
                  key={e.url}
                  className="btn btn-accent btn-lg"
                  onClick={(ev) => setSrc(e.url)}
                >
                  {`${e.quality}`}
                </button>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}
