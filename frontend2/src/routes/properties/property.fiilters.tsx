import { $, component$, useStore } from "@builder.io/qwik";
import { useNavigate } from "@builder.io/qwik-city";

export default component$(() => {
 
  const query = useStore({ link: "/properties?take=5&page=1&" });
  const nav = useNavigate();
  const setQuery = $((e: Event) => {
    query.link += `${(e.target as HTMLInputElement).name}=${(e.target as HTMLInputElement).value}&`;
  });
  return (
    <div class="join mt-2 flex w-full flex-wrap items-center justify-center">
      <div>
        <div>
          <input
            name="min_price"
            class="input join-item input-bordered"
            placeholder="Min Price"
            onChange$={setQuery}
          />
        </div>
      </div>
      <div>
        <div>
          <input
            name="max_price"
            class="input join-item input-bordered"
            placeholder="Max Price"
            onChange$={setQuery}
            
          />
        </div>
      </div>

      <select
        name="accomodation_type"
        class="join-item select select-bordered"
        onChange$={setQuery}
      >
        <option disabled selected>
          Accomodation Type
        </option>
        <option>Buy</option>
        <option>Rent</option>
      </select>

      <select
        name="property_type"
        class="join-item select select-bordered"
        onChange$={setQuery}
      >
        <option disabled selected>
          Property Type
        </option>
        <option>House</option>
        <option>Apartment</option>
      </select>
      <select
        name="nr_rooms"
        class="join-item select select-bordered"
        onChange$={setQuery}
      >
        <option disabled selected>
          Nr. Rooms
        </option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <select
        name="nr_baths"
        class="join-item select select-bordered"
        onChange$={setQuery}
      >
        <option disabled selected>
          Nr. Bathrooms
        </option>
        <option>1</option>
        <option>2</option>
        <option>3</option>
        <option>4</option>
      </select>
      <select
        name="results_per_page"
        class="join-item select select-bordered"
        onChange$={(e) =>{
            query.link = query.link.replace("take=5", `take=${(e.target as HTMLSelectElement).value}`);
            console.log(query.link);
        }}
      >
        <option disabled selected>
          Results Per Page
        </option>
        <option>5</option>
        <option>10</option>
        <option>15</option>
      </select>
      <div class="indicator">
        <button
          class="btn join-item"
          onClick$={async () => {
            await nav(query.link);
            query.link = "/properties?take=5&page=1&"
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
});
