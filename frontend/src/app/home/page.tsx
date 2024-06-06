import { api } from "~/trpc/server";
import TestButton from "./test-button";
import Image from "next/image";
import React from "react";
import PropertyCard from "./property.card";

export default async function Home() {
  const properties = await api.property.getAll({ skip: 0, take: 10 });
  console.log(properties);
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <TestButton />
      {properties.map((property, index) => (
        <PropertyCard key={property.id} property={property} card_index={index}/>
      ))}
    </main>
  );
}
