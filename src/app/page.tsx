"use client";
import { Button, Input } from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "whichanime/components/themeToggle";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="container mx-auto">
      <Head>
        <title>Tv Anime</title>
      </Head>
      <ThemeToggle />
      <div className=" p-6 rounded-md shadow-md w-9/12 mx-auto ">
        <label
          htmlFor="username"
          className="block text-3xl font-medium text-center"
        >
          Search Anime
        </label>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            router.push(`/search?search=${search}`);
          }}
        >
          <Input
            type="text"
            id="username"
            name="username"
            value={search}
            onChange={(e) => {
              setSearch((s) => e.target.value);
            }}
            className=""
          />
        </form>
        <div className="m-2 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-4">
          {[
            0,
            1,
            2,
            3,
            4,
            6,
            7,
            8,
            9,
            "a",
            "b",
            "c",
            "d",
            "e",
            "f",
            "g",
            "h",
            "i",
            "j",
            "k",
            "l",
            "m",
            "n",
            "o",
            "p",
            "q",
            "r",
            "s",
            "t",
            "u",
            "v",
            "w",
            "x",
            "y",
            "z",
            ",",
            ".",
            ":",
            " ",
          ].map((key, idx) => {
            return (
              <Button
                variant="outline"
                className=" "
                key={idx}
                onClick={() => {
                  setSearch((s) => s + key);
                }}
              >
                <p className="font-bold text-lg">{key}</p>
              </Button>
            );
          })}
          <Button
            className=" "
            variant="outline"
            onClick={() => {
              setSearch((s) => s.slice(0, -1));
            }}
          >
            <p className="font-bold text-lg">(x)</p>
          </Button>
          <Button
            variant="outline"
            className=" "
            onClick={() => {
              router.push(`/search?search=${search}`);
            }}
          >
            <p className="font-bold text-lg">{"=>"}</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
