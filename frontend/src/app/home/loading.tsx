"use client";
import React from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
export default function Loading() {
  return <main className="flex flex-col justify-center items-center w-screen h-screen"><DotLottieReact src="/test.json" loop autoplay /></main>
}
