import { api } from "~/trpc/server";
import React from "react";
import PropertyCard from "./property.card";
import TestButton from "./test-button";
import Link from "next/link";
import PropertyFilters from "./property.filters";

export default async function Home({
  searchParams,
}: {
  params: { home: string; id: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  let nextLink = "/home?";
  let prevLink = "/home?";
  console.log(searchParams);

  const skip = (Number(searchParams.page) -1) * Number(searchParams.take);
  const query: Record<string, string | number | string[] | undefined> = {
    take: searchParams.take ? searchParams.take : 3,
    skip: skip ?? 0,
  };

  for (const [key, value] of Object.entries(searchParams)) {
    if (value !== null) {
      if (key === "page") {
        nextLink += `${key}=${Number(value) + 1}&`;
        prevLink += `${key}=${Number(value) - 1}&`;
      } else {
        nextLink += `${key}=${value}&`;
        prevLink += `${key}=${value}&`;
      }
    }
  }
  console.log("link");
  console.log(nextLink);
  console.log(query);
 

  const properties = await api.property.getByFilter({
    accomodation_type:searchParams.accomodation_type as "Buy" | "Rent",
    property_type:searchParams.property_type as "House" | "Apartment",
    take:Number(searchParams.take),
    skip:(Number(searchParams.page) -1) * Number(searchParams.take),
    nr_baths:searchParams.nr_baths ? Number(searchParams.nr_baths):undefined,
    nr_rooms:searchParams.nr_rooms ? Number(searchParams.nr_rooms):undefined,
    min_price:searchParams.min_price ? Number(searchParams.min_price):undefined,
    max_price:searchParams.max_price ? Number(searchParams.max_price):undefined,
    
  });
  console.log(properties);
  console.log(properties.length);

  return (
    <>
      <PropertyFilters />
      <main className="my-5 flex min-h-screen flex-col items-center justify-center gap-3">
        
        {properties.map((property, index) => (
          <PropertyCard
            key={property.id}
            property={property}
            card_index={index}
          />
        ))}
      </main>
      <div className="join min-w-full grid grid-cols-2 bottom-0 fixed bg-white justify-center items-center">
       <Link href={prevLink} className="btn btn-outline join-item w-full">
          Previous Page
        </Link>
       <Link href={nextLink} className="btn btn-outline join-item w-full">
          Next Page
        </Link>
      </div>
    </>
  );
}
