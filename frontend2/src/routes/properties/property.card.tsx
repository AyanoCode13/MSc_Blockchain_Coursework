import { $, component$, useSignal } from "@builder.io/qwik";

export default component$(({ property, card_index }: {property:any, card_index:number}) => {
  const nextIndex = useSignal(0);
  const prevIndex = useSignal(0);

  const handleSetNextIndex = $(() => {
    console.log(property.gallery.length);
    if (nextIndex.value === property.gallery.length - 1) {
      nextIndex.value = 0;
    } else {
      nextIndex.value++;
    }
  });
  const handleSetPrevIndex = $(() => {
    if (prevIndex.value === 0) {
      prevIndex.value = property.gallery.length - 1;
    } else {
      prevIndex.value--;
    }
  });
  return (
    <div class="card bg-base-100 shadow-xl lg:card-side mx-5">
      <div class="carousel w-fit lg:w-2/5">
        {property.gallery.map((image: string, index: number) => {
          return (
            <div
              id={"slide" + card_index + index}
              class="carousel-item relative w-full"
              key={index}
            >
              <img
                src={image}
                class="w-full  rounded-tl-md rounded-bl-md"
                width={200}
                height={200}
                alt="image"
                loading="eager"
              />
              <div class="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={"#slide" + card_index + prevIndex.value}
                  class="btn btn-circle"
                  onClick$={() => handleSetPrevIndex()}
                >
                  ❮
                </a>
                <a
                  href={"#slide" + card_index + nextIndex.value}
                  class="btn btn-circle"
                  onClick$={() => handleSetNextIndex()}
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div class="card-body w-full lg:w-2/5">
        <h2 class="card-title">Price: {property.price}</h2>
        <p>{property.description}</p>
        <p>{property.address}</p>
        <p class="flex items-center gap-2">Available </p>
        <div class="flex items-center gap-3 text-xl">
          {property.nr_baths}

          {property.nr_rooms}
        </div>
        <div class="card-actions justify-end">
          <button class="btn btn-primary">Buy</button>
          <button class="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  );
});
