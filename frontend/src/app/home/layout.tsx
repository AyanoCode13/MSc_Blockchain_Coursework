"use client";
import { GeistSans } from "geist/font/sans";
import Footer from "./footer";
import HomeNavigationBar from "./home.navbar";
import "~/styles/globals.css";
import { MetaMaskProvider } from "@metamask/sdk-react";
import { Suspense } from "react";
import Loading from "./loading";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="emerald" className={`${GeistSans.variable}`}>
      <body>
        <MetaMaskProvider
          sdkOptions={{
            dappMetadata: {
              name: "Example React UI Dapp",
              url: window.location.href,
            },
            injectProvider: true,
            
          }}
        >
          <Suspense fallback={<Loading/>}>
          <HomeNavigationBar>
            {children}

            <Footer />
          </HomeNavigationBar>
          </Suspense>
         
        </MetaMaskProvider>
      </body>
    </html>
  );
}
