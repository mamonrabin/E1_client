import type { Metadata } from "next";
import "./globals.css";

import { jost } from "./font";
import { Toaster } from "react-hot-toast";
import CartProvider from "../providers/CartProvider";

export const metadata: Metadata = {
  title: "Soza",
  description: "Soza website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
       <Toaster />
       <CartProvider>
        {children}
        </CartProvider>
      </body>
    </html>
  );
}
