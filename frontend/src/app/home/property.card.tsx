"use client";
import Image from "next/image";
import React from "react";
import { FaBath } from "react-icons/fa";
import { FaBed } from "react-icons/fa";

export default function PropertyCard({
  property,
  card_index,
}: {
  property: any;
  card_index: number;
}) {
  const [nextIndex, setNextIndex] = React.useState(0);
  const [prevIndex, setPrevIndex] = React.useState(0);

  const handleSetNextIndex = () => {
    console.log(property.gallery.length);
    if (nextIndex === property.gallery.length - 1) {
      setNextIndex(0);
    } else {
      setNextIndex((crtIndex) => crtIndex + 1);
    }
  };
  const handleSetPrevIndex = () => {
    if (prevIndex === 0) {
      setPrevIndex(property.gallery.length - 1);
    } else {
      setPrevIndex((crtIndex) => crtIndex - 1);
    }
  };
  return (
    <div className="card bg-base-100 shadow-xl lg:card-side">
      <div className="carousel w-2/3">
        {property.gallery.map((image, index) => {
          return (
            <div
              id={"slide" + card_index + index}
              className="carousel-item relative w-full"
              key={index}
            >
              <Image
                src={image}
                className="w-full"
                width={200}
                height={200}
                alt="image"
              />
              <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 transform justify-between">
                <a
                  href={"#slide" + card_index + prevIndex}
                  className="btn btn-circle"
                  onClick={() => handleSetPrevIndex(index)}
                >
                  ❮
                </a>
                <a
                  href={"#slide" + card_index + nextIndex}
                  className="btn btn-circle"
                  onClick={() => handleSetNextIndex(index)}
                >
                  ❯
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className="card-body w-fit">
        <h2 className="card-title">Price: {property.price}</h2>
        <p>{property.description}</p>
        <p>{property.address}</p>
        <div className="flex items-baseline  gap-3 text-xl">
          <FaBath className="h-6 w-6" />
          {property.nr_baths}
          <FaBed className="h-6 w-6" />
          {property.nr_rooms}
        </div>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy</button>
          <button className="btn btn-primary">View</button>
        </div>
      </div>
    </div>
  );
}
