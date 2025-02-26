import Link from "next/link";
import SearchAnimeInput from "./anime/_components/search";
import "./globals.css";
import "@vime/core/themes/default.css";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Tv Anime`,
    description: `watch anime ad free without interruption`,
  };
}
//version bump
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="navbar bg-base-100">
          <div className="flex-1">
            <Link href={"/anime"} className="btn btn-ghost text-xl">
              TvAnime
            </Link>
          </div>
          <div className="flex-1 gap-2">
            <div className="w-full">
              <SearchAnimeInput />
            </div>
            <div className="dropdown dropdown-end"></div>
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}
