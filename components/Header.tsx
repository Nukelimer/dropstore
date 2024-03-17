import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ThemeToggle } from "./ThemeToggle";

function Header() {
  return (
    <header className="bg-slate-100 text-primary dark:bg-slate-900 flex justify-between px-4 py-6 ">
      <div className="">
        <Link href={"/"}>
          <div className="flex justify-center items-center gap-1">
            <Image
              alt="logo"
              src={"/logo/dropstore.svg"}
              width={30}
              height={30}
              className="invert dark:filter-none"
            />
            <h1>Drop Store</h1>
          </div>
        </Link>
      </div>
      <div className=" flex items-center gap-3 bg-inherit">
        <ThemeToggle />
        <UserButton afterSignOutUrl="/" />
        <SignedOut>
          <SignInButton afterSignInUrl="/dashboard" mode="modal" />
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
