/** @format */

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import Provider from "./provider";
import { Toaster } from "@/components/ui/toaster";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(inter.className, "p-4 flex flex-col")}>
        <Provider>
          <>
            <div className="flex items-center gap-4 pb-4">
              <Link href={"/"} className={buttonVariants({ variant: "link" })}>
                Home
              </Link>
              <Link
                href={"/users"}
                className={buttonVariants({ variant: "link" })}
              >
                Users
              </Link>
              <Link
                href={"/tasks"}
                className={buttonVariants({ variant: "link" })}
              >
                tasks
              </Link>
              <Link
                href={"/profile-from"}
                className={buttonVariants({ variant: "link" })}
              >
                profile-from
              </Link>
              <Link
                href={"/user-form"}
                className={buttonVariants({ variant: "link" })}
              >
                User From
              </Link>
              <Link
                href={"/authentication"}
                className={buttonVariants({ variant: "link" })}
              >
                Sign In
              </Link>
              <Link
                href={"/dashboard"}
                className={buttonVariants({ variant: "link" })}
              >
                Dashboard
              </Link>
            </div>
            <div>{children}</div>
          </>
          <Toaster />
        </Provider>
      </body>
    </html>
  );
}
