"use client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import IconSearch from "whichanime/components/search-icon";

export default function SearchAnimeInput({
  searchTerm,
}: {
  searchTerm?: string;
}) {
  const [search, setSearch] = useState(searchTerm);
  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push("?search=" + search);
  };
  const router = useRouter();

  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <IconSearch />
        </label>
      </form>
    </>
  );
}
