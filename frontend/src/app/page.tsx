import Link from "next/link";
import React from "react";

export default function Home() {
  return (
<main className="hero min-h-screen" style={{backgroundImage: 'url(/house2.jpg)'}}>
  <div className="hero-overlay bg-opacity-60"></div>
  <div className="hero-content text-center text-neutral-content">
    <div className="max-w-lg">
      <h1 className="mb-5 text-6xl font-bold flex">Real Estate DApp</h1>
      <h3 className="mb-5 text-3xl">The real estate NFT marketplace</h3>
      <Link href={"/home"} className="btn btn-primary">Connect to Metamask</Link>
    </div>
  </div>
</main>
  
  );
}


