"use client";
import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  Divider,
  Heading,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { IAnimeResult, ISearch } from "@consumet/extensions";
import Head from "next/head";
import Link from "next/link";
import ThemeToggle from "whichanime/components/themeToggle";
export default function SearchClient({
  animeSearchResult,
  searchParams,
}: {
  animeSearchResult: ISearch<IAnimeResult>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  return (
    <div className="container mx-auto ">
      <Head>
        <title>{searchParams["search"]}</title>
      </Head>
      <ThemeToggle />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-col-5 grid-flow-row-dense  gap-4">
        {animeSearchResult.results.map((data, idx) => {
          return (
            <Link href={`/anime/${data.id}`} key={idx}>
              <Card key={idx}>
                <CardBody>
                  <Image
                    src={data.image as string}
                    alt={data.title.toString()}
                    w="sm"
                    h="sm"
                    borderRadius="lg"
                  />
                </CardBody>
                <Divider />
                <CardFooter>
                  <Heading size="md">{data.title.toString()}</Heading>
                </CardFooter>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
