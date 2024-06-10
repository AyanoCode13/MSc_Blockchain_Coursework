"use client";

import Link from "next/link";
import {
    useSearchParams
} from "next/navigation";

export default function Pagination() {
  
  const search = useSearchParams();
  const page = search.get("page");
  

  return (
    <div className="join mx-2 grid grid-cols-2">
      <Link
        href={`/home?&page=${Number(page) - 1}`}
        className="btn btn-outline join-item w-full"
      >
        Previous Page
      </Link>
      <Link
        href={`/home?&page=${Number(page) + 1}`}
        className="btn btn-outline join-item w-full"
      >
        Next Page
      </Link>
    </div>
  );
}
