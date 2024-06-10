import { component$ } from "@builder.io/qwik";
import { type RequestEventLoader, routeLoader$ } from "@builder.io/qwik-city";
import prisma from "~/components/db/prisma";
import PropertyCard from "./property.card";
import PropertyFiilters from "./property.fiilters";

export const useProductDetails = routeLoader$(
  async ({ query }: RequestEventLoader) => {
    // This code runs only on the server, after every navigation
    const obj: Record<string, string | number> = {};
    
    query.forEach((value, key) => {
      if(value!==""){
        if(key === "nr_rooms" || key === "nr_baths" || key === "price" || key === "page" || key === "take") {
          obj[key] = parseInt(value);
        }
        else {
          obj[key] = value;
        }
      }
    })
    console.log(obj);
    
    


    

    const res = await prisma.property.findMany({
     where:{
        city: obj.city as string,
        zipcode: obj.zipcode as string,
        nr_rooms: obj.nr_rooms as number,
        nr_baths: obj.nr_baths as number,
        price: obj.price as number,
        property_type: obj.property_type as "House" | "Apartment",
        accomodation_type: obj.accomodation_type as "Buy" | "Rent",
      
     },
      skip: obj.page && obj.take ? Number(obj.page as number - 1) * Number(obj.take):0,
      take: Number(obj.take),
      select: {
        id: true,
        name: true,
        description: true,
        price: true,
        address: true,
        city: true,
        country: true,
        zipcode: true,
        nr_rooms: true,
        nr_baths: true,
        property_type: true,
        accomodation_type: true,
        thumbnail: true,
        gallery: true,
        available: true,
        owner: true,
      },
    });
    console.log(res);
   
    return res.map((item) => {
      return {
        ...item,
        price: item.price.toString(),
      };
    });
  },
);

export default component$(() => {
  const res = useProductDetails();

  return (
    <>
    <PropertyFiilters />
      <main class="my-5 flex min-h-screen flex-col items-center justify-center gap-3">
        {res.value.map((property, index) => {
          return (
            <PropertyCard key={index} card_index={index} property={property} />
          );
        })}
      </main>
    </>
  );
});
