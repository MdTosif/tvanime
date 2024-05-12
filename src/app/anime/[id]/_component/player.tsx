"use client";
import { IVideo } from "@consumet/extensions";
import { Player, DefaultUi, Hls } from "@vime/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function VimePlayer({
  thumbnail,
  vidSrc,
}: {
  thumbnail?: string;
  vidSrc?: IVideo[];
}) {
  // Obtain a ref if you need to call any methods.
  const [src, setSrc] = useState(vidSrc?.[0]?.url);

  return (
    <>
      <div className="grid grid-cols-12 gap-6 p-4 rounded-lg shadow-lg">
        <div className="col-span-12 lg:col-span-11">
          <Player>
            {/* Provider component is placed here. */}
            {src && (
              <Hls version="latest" poster={thumbnail}>
                <source data-src={src} type="application/x-mpegURL" />
              </Hls>
            )}
            <DefaultUi></DefaultUi>
          </Player>
        </div>
        <div className="col-span-1">
          <div className="flex flex-row flex-wrap w-svw lg:w-auto lg:flex-col gap-4 ">
            {vidSrc?.map &&
              vidSrc?.map((e) => (
                <button
                  key={e.url}
                  className="btn btn-accent btn-md "
                  onClick={(ev) => setSrc(e.url)}
                >
                  {`${e.quality}`}
                </button>
              ))}
            <Link
              href={`intent:${src}#Intent;package=com.mxtech.videoplayer.ad;S.title=New%20title;end`}
              className="btn btn-primary btn-md "
            >
              mx
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
