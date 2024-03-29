"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSidebarStore } from "@/store/sidebarStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronDown, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { Board } from "../types";
import AddBoard from "./AddBoard";
import ThemeToggle from "./ThemeToggle";
import { Skeleton } from "./ui/skeleton";

const BoardMenu = () => {
  const [open, setOpen] = useState(false);

  const [activeBoard, setActiveBoard, openNavbarMenu, setOpenNavbarMenu] =
    useSidebarStore((state) => [
      state.activeBoard,
      state.setActiveBoard,
      state.openNavbarMenu,
      state.setOpenNavbarMenu,
    ]);

  const { data: boards, isLoading } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      return await axios
        .get("/api/boards")
        .then((res) => res.data)
        .catch((err) => console.log(err));
    },
  });

  useEffect(() => {
    if (!isLoading && boards?.[0]) {
      if (activeBoard) {
        const board = boards.find(
          (board: Board) => activeBoard.id === board.id
        );
        setActiveBoard(board);
      } else {
        setActiveBoard(boards[0]);
      }
    }
  }, [boards, isLoading, setActiveBoard, activeBoard]);

  if (isLoading) {
    return <Skeleton className="w-40 h-6 rounded-[0.3rem]" />;
  } else if (!boards) {
    return <div className="">Add new board</div>;
  }

  return (
    <>
      <h2 className="hidden text-lg font-bold md:flex items-center">
        {activeBoard?.name}
      </h2>
      <Dialog open={openNavbarMenu} onOpenChange={setOpenNavbarMenu}>
        <DialogTrigger className="md:hidden">
          <h2 className="text-lg font-bold flex items-center">
            {activeBoard?.name}
            <ChevronDown
              className={`ml-2 h-4 w-4 font-bold text-primary transition-all duration-300 ${
                open && "rotate-180"
              }`}
            />
          </h2>
        </DialogTrigger>
        <DialogContent className="max-w-[17.5rem] rounded p-0 py-[1.1875rem] bg-white dark:bg-[#2b2c37] border-none">
          <DialogHeader>
            <DialogTitle className="pl-[1.1875rem] text-left text-[#828FA3] uppercase heading-sm">
              All boards ({boards.length})
            </DialogTitle>
            <DialogDescription className="pt-[1.375rem] flex flex-col items-start text-[0.9375rem] leading-[1.1875rem] font-bold">
              {boards.map((board: Board) => (
                <div
                  key={board.id}
                  onClick={() => setActiveBoard(board)}
                  className={`${
                    board.id === activeBoard?.id
                      ? "bg-primary text-primary-foreground"
                      : "text-[#828FA3]"
                  } py-[1.125rem] pl-[1.1875rem] pr-[4.375rem] flex items-center gap-[0.8125rem] rounded-r-[6.25rem]`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                      fill="white"
                      className={`fill-current ${
                        activeBoard?.id === board.id
                          ? "text-white"
                          : "text-muted-foreground"
                      }`}
                    />
                  </svg>

                  {board.name}
                </div>
              ))}
              <AddBoard />
              <div className="ml-[1.1875rem]">
                <ThemeToggle />
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default BoardMenu;
