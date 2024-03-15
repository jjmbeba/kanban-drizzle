"use client";

import { ClerkLoading, UserButton } from "@clerk/nextjs";
import BoardMenu from "./BoardMenu";
import OptionsMenu from "./OptionsMenu";
import { Skeleton } from "./ui/skeleton";

const NavbarActions = () => {
  return (
    <div className="flex items-center flex-1 justify-between">
      <BoardMenu />
      <div className="flex items-center gap-3">
        <OptionsMenu />
        <div className="w-8 h-8">
          <ClerkLoading>
            <Skeleton className="w-8 h-8 rounded-full" />
          </ClerkLoading>
          <UserButton />
        </div>
      </div>
    </div>
  );
};

export default NavbarActions;
