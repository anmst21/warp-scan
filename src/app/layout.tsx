import "./globals.css";
import "../../public/fonts/fonts.css";
import { headers } from "next/headers";

import { cookieToInitialState } from "wagmi";

import { config } from "@/features/wallet-connect-config";
import Web3ModalProvider from "@/context";
import ConnectButton from "@/components/connect-btn";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialState = cookieToInitialState(config, headers().get("cookie"));

  return (
    <html lang="en">
      <body>
        <header className="bg-black flex justify-end h-[5vh] items-center">
          <ConnectButton />
        </header>

        <Web3ModalProvider initialState={initialState}>
          <main className="bg-green-500 h-[95vh]">{children}</main>
        </Web3ModalProvider>
      </body>
    </html>
  );
}
