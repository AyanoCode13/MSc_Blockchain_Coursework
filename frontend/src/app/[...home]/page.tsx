import { api } from "~/trpc/server";
import React from "react";
import PropertyCard from "./property.card";
import TestButton from "./test-button";

export default async function Home({params}:{params:{home:string, id:string}}) {
  const [_, id] = params.home;
  console.log(id)
  const properties = await api.property.getAll({ skip: id ? Number(id)*3:0, take: 3 });
  console.log(properties);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 my-5">
      <TestButton />
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} card_index={index}/>
      ))}
    </main>
  );
}
