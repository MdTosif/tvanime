"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  return (
    <div className="container mx-auto">
      <div className=" p-6 rounded-md shadow-md w-9/12 mx-auto ">
        <label
          htmlFor="username"
          className="block text-3xl font-medium text-white text-center"
        >
          Search Anime
        </label>
        <form onSubmit={(e)=>{
          e.preventDefault();
          router.push(`/search?search=${search}`);

        }}>
        <input
          type="text"
          id="username"
          name="username"
          value={search}
          onChange={(e) => {
            setSearch((s) => e.target.value);
          }}
          className="mt-1 p-2 w-full border bg-slate-500 border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500"
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
              <button
                className="py-2 bg-gray-500 bg-opacity-40 border rounded-2xl "
                key={idx}
                onClick={() => {
                  setSearch((s) => s + key);
                }}
              >
                <p className="font-bold text-lg">{key}</p>
              </button>
            );
          })}
          <button
            className="py-2 bg-gray-500 bg-opacity-40 border rounded-2xl "
            onClick={() => {
              setSearch((s) => s.slice(0, -1));
            }}
          >
            <p className="font-bold text-lg">(x)</p>
          </button>
          <button
            className="py-2 bg-gray-500 bg-opacity-40 border rounded-2xl "
            onClick={() => {
              router.push(`/search?search=${search}`);
            }}
          >
            <p className="font-bold text-lg">{"=>"}</p>
          </button>
        </div>
      </div>
    </div>
  );
}
