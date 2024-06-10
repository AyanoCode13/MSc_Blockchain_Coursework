"use client";

import { useRouter } from "next/navigation";
import React from "react";

export default function PropertyFilters() {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let link = "/home?";
    const query = {
      min_price: e.target.min_price.value,
      max_price: e.target.max_price.value,
      accomodation_type: e.target.accomodation_type.value,
      property_type: e.target.property_type.value,
      nr_rooms: e.target.nr_rooms.value,
      nr_baths: e.target.nr_baths.value,
      page: 1,
      take: 5,
    };
    for (const [key, value] of Object.entries(query)) {
      if (value !== "DEFAULT" && value !== "") {
        link += `${key}=${value}&`;
      }
    }
    console.log(e.target.min_price.value);
    console.log(link);
    e.currentTarget.reset();
    router.push(link);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="join mt-2 flex w-full flex-wrap items-center justify-center">
        <div>
          <div>
            <input
              name="min_price"
              className="input join-item input-bordered"
              placeholder="Min Price"
            />
          </div>
        </div>
        <div>
          <div>
            <input
              name="max_price"
              className="input join-item input-bordered"
              placeholder="Max Price"
            />
          </div>
        </div>

        <select
          name="accomodation_type"
          defaultValue={"DEFAULT"}
          className="join-item select select-bordered"
        >
          <option disabled value={"DEFAULT"}>
            Accomodation Type
          </option>
          <option>Buy</option>
          <option>Rent</option>
        </select>

        <select
          name="property_type"
          defaultValue={"DEFAULT"}
          className="join-item select select-bordered"
        >
          <option disabled value={"DEFAULT"}>
            Property Type
          </option>
          <option>House</option>
          <option>Apartment</option>
        </select>
        <select
          name="nr_rooms"
          defaultValue={"DEFAULT"}
          className="join-item select select-bordered"
        >
          <option disabled value={"DEFAULT"}>
            Nr. Rooms
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <select
          name="nr_baths"
          defaultValue={"DEFAULT"}
          className="join-item select select-bordered"
        >
          <option disabled value={"DEFAULT"}>
            Nr. Bathrooms
          </option>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
        </select>
        <select
          name="results_per_page"
          defaultValue={"DEFAULT"}
          className="join-item select select-bordered"
        >
          <option disabled value={"DEFAULT"}>
            Results Per Page
          </option>
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
        <div className="indicator">
          <button className="btn join-item" type="submit">
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
