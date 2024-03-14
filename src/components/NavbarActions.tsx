import { UserButton, ClerkLoading } from "@clerk/nextjs";
import AddTaskButton from "./AddTaskButton";
import BoardMenu from "./BoardMenu";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";
import { MoreHorizontal, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import OptionsMenu from "./OptionsMenu";

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
