import { PropsWithChildren } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="container mx-auto mt-4">
      <Navbar />

      <main>{children}</main>
      <Footer />
    </div>
  );
}
