import { UserButton, ClerkLoading } from "@clerk/nextjs";
import AddTaskButton from "./AddTaskButton";
import BoardMenu from "./BoardMenu";
import { Skeleton } from "./ui/skeleton";

const NavbarActions = () => {
  return (
    <div className="flex items-center flex-1 justify-between">
      <BoardMenu />
      <div className="flex items-center gap-3">
        <AddTaskButton />
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
