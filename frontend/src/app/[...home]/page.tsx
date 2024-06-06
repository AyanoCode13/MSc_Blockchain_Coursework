import { api } from "~/trpc/server";
import React from "react";
import PropertyCard from "./property.card";
import TestButton from "./test-button";

export default async function Home({params, searchParams}:{params:{home:string, id:string},   searchParams: Record<string, string | string[] | undefined>}) {
  const [_, id] = params.home;
  console.log(params)
  const properties = await api.property.getByZipCode({zipcode:searchParams.zipcode, skip: id ? Number(id)*3:0, take: 3 });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 my-5">
      <TestButton />
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} card_index={index}/>
      ))}
    </main>
  );
}
