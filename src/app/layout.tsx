
"use client"
import Header from "@/components/layout/Header";
// import { Provider } from "react-redux";
import "./globals.css";
import { WalletProvider } from "bitcoin-wallet-adapter";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "@/stores";
// import { SocketProvider } from "@/components/providers/socket";

type AuthViewProps = {
  isAuthorized: boolean;
  setIsAuthorized: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <WalletProvider>
        {/* <SocketProvider> */}
          <html lang="en">
            <body className="bg-primary">
              <main className="">
                <Header />
                
                <div className="lg:p-8 p-4 mt-20">{children}</div>
              </main>
            </body>
          </html>
        {/* </SocketProvider> */}
      </WalletProvider>
      </Provider>
  );
}

