"use client";
import { MetaMaskUIProvider } from "@metamask/sdk-react-ui";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MetaMaskUIProvider
      sdkOptions={{
        dappMetadata: {
          name: "Example React UI Dapp",
          url: window.location.href,
        },

        // Other options.
      }}
    >
      {children}
    </MetaMaskUIProvider>
  );
}
