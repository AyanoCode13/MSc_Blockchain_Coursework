import { TRPCReactProvider } from "~/trpc/react";
import Footer from "../footer";
import NavigationBar from "../navbar";
import Pagination from "./pagination";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <NavigationBar>
        {children}
        <Pagination />
        <Footer />
      </NavigationBar>
    </TRPCReactProvider>
  );
}

