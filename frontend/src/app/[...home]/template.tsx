import { TRPCReactProvider } from "~/trpc/react";
import Footer from "../footer";
import NavigationBar from "../navbar";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <TRPCReactProvider>
      <NavigationBar>
        {children}
       
        <Footer />
      </NavigationBar>
    </TRPCReactProvider>
  );
}

