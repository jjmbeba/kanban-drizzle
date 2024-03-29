"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import { Board } from "@/types";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useEffect } from "react";
import AddBoard from "./AddBoard";
import ThemeToggle from "./ThemeToggle";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const variants = {
  showSidebar: {
    width: "16.25rem",
    transition: {
      type: "spring",
      duration: 0.4,
    },
    opacity: 1,
  },
  hideSidebar: {
    width: 0,
    transition: {
      type: "spring",
      duration: 0.4,
    },
    opacity: 0,
  },
};

const SidebarSkeleton = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}) => {
  return (
    <div className="relative">
      <div className="absolute bottom-[2.0625rem] lg:bottom-4 -right-[2.5rem] hidden md:block">
        <Button
          size={"icon"}
          className="rounded-l-none flex items-center justify-center"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? <Eye /> : <EyeOff />}
        </Button>
      </div>
      <motion.div
        initial={"hideSidebar"}
        variants={variants}
        animate={showSidebar ? "showSidebar" : "hideSidebar"}
        className="relative h-full bg-white dark:bg-[#2b2c37]  pt-[1.875rem] pb-10 max-w-[16.25rem] hidden md:block border-r border-r-[#e4ebfa] dark:border-r-[#3e3f4e]"
      >
        <div className="pl-[1.1875rem] text-left text-[#828FA3] uppercase text-[0.75rem] tracking-[0.15rem]">
          <Skeleton className="h-[1.125rem] w-[7rem]" />
        </div>
        <div className="pt-[1.375rem] flex flex-col items-start text-[0.9375rem] leading-[1.1875rem] font-bold gap-4">
          {new Array(4).fill(0).map((_, index) => (
            <Skeleton
              key={index}
              className="py-[1.125rem] pl-[1.1875rem] flex items-center gap-[0.8125rem] rounded-r-[6.25rem] text-primary w-[14.95rem] h-[1.1875rem]"
            />
          ))}
          <div className="mx-[0.8125rem] mt-8">
            <ThemeToggle />
          </div>
          {
            <Button
              variant={"ghost"}
              className="text-[#828FA3] mx-[0.8125rem] mt-[2.25rem] flex items-center gap-[0.625rem]"
              onClick={() => setShowSidebar(false)}
            >
              <EyeOff /> Hide sidebar
            </Button>
          }
        </div>
      </motion.div>
    </div>
  );
};

const CreateBoardPrompt = ({
  showSidebar,
  setShowSidebar,
}: {
  showSidebar: boolean;
  setShowSidebar: (showSidebar: boolean) => void;
}) => {
  return (
    <div className="relative">
      <motion.div
        initial={"hideSidebar"}
        variants={variants}
        animate={showSidebar ? "showSidebar" : "hideSidebar"}
        className="h-full bg-white dark:bg-[#2b2c37]  pt-[1.875rem] pb-10 max-w-[16.25rem] hidden md:block border-r border-r-[#e4ebfa] dark:border-r-[#3e3f4e]"
      >
        <div className="absolute bottom-[2.0625rem] lg:bottom-4 -right-[2.5rem] hidden md:block">
          <Button
            size={"icon"}
            className="rounded-l-none flex items-center justify-center"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {!showSidebar ? <Eye /> : <EyeOff />}
          </Button>
        </div>
        <div className="pl-[1.1875rem] text-left text-[#828FA3] uppercase text-[0.75rem] tracking-[0.15rem]">
          No boards found
        </div>
        <div className="pt-[1.375rem] flex flex-col items-start text-[0.9375rem] leading-[1.1875rem] font-bold gap-4">
          <AddBoard />
          <div className="mx-[0.8125rem] mt-8">
            <ThemeToggle />
          </div>
          {
            <Button
              variant={"ghost"}
              className="text-[#828FA3] mx-[0.8125rem] mt-[2.25rem] flex items-center gap-[0.625rem]"
              onClick={() => setShowSidebar(false)}
            >
              <EyeOff /> Hide sidebar
            </Button>
          }
        </div>
      </motion.div>
    </div>
  );
};

const Sidebar = () => {
  const [showSidebar, setShowSidebar, activeBoard, setActiveBoard] =
    useSidebarStore((state) => [
      state.showSidebar,
      state.setShowSidebar,
      state.activeBoard,
      state.setActiveBoard,
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

  if (isLoading && showSidebar) {
    return (
      <SidebarSkeleton
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    );
  } else if (!boards) {
    return (
      <CreateBoardPrompt
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    );
  }

  return (
    <div className="relative">
      <div className="absolute bottom-[2.0625rem] lg:bottom-4 -right-[2.5rem] hidden md:block">
        <Button
          size={"icon"}
          className="rounded-l-none flex items-center justify-center"
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {!showSidebar ? <Eye /> : <EyeOff />}
        </Button>
      </div>
      <motion.div
        variants={variants}
        initial={"hideSidebar"}
        animate={showSidebar ? "showSidebar" : "hideSidebar"}
        className="h-full bg-white dark:bg-[#2b2c37]  pt-[1.875rem] pb-10 max-w-[16.25rem] hidden md:block border-r border-r-[#e4ebfa] dark:border-r-[#3e3f4e]"
      >
        <div className="pl-[1.1875rem] text-left text-[#828FA3] uppercase text-[0.75rem] tracking-[0.15rem]">
          All boards ({boards.length})
        </div>
        <div className="pt-[1.375rem] flex flex-col items-start text-[0.9375rem] leading-[1.1875rem] font-bold">
          {boards.map((board: Board) => (
            <div
              key={board.id}
              onClick={() => setActiveBoard(board)}
              className={`${
                board.id === activeBoard?.id
                  ? "bg-primary text-primary-foreground"
                  : "text-[#828FA3]"
              } py-[1.125rem] pl-[1.1875rem] pr-[4.375rem] cursor-pointer flex items-center gap-[0.8125rem] rounded-r-[6.25rem]`}
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
          <div className="mx-[0.8125rem]">
            <ThemeToggle />
          </div>
          {
            <Button
              variant={"ghost"}
              className="text-[#828FA3] mx-[0.8125rem] mt-[2.25rem] flex items-center gap-[0.625rem]"
              onClick={() => setShowSidebar(false)}
            >
              <EyeOff /> Hide sidebar
            </Button>
          }
        </div>
      </motion.div>
    </div>
  );
};

export default Sidebar;
