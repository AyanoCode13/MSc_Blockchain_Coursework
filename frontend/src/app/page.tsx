"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

export default function Home() {
  const [zipcode, setZipcode] = React.useState("");
  const router = useRouter();

  return (
    <main
      className="hero min-h-screen"
      style={{ backgroundImage: "url(/house2.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-center text-neutral-content">
        <div className="max-w-lg">
          <h1 className="mb-5 flex text-6xl font-bold">Real Estate DApp</h1>
          <h3 className="mb-5 text-3xl">The real estate NFT marketplace</h3>
          <div className="join">
            <div>
              <div>
                <input
                  className="input join-item input-bordered text-black"
                  placeholder="Enter Zipcode"
                  required
                  onChange={(e)=>setZipcode(e.target.value)}
                />
              </div>
            </div>

            <div className="indicator">
              <Link href={"/home?zipcode="+zipcode+"&page=1&take=3"} className="btn join-item">Search</Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
