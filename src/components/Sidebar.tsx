"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import React, { useEffect } from "react";
import { Button } from "./ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import { useQuery } from "@tanstack/react-query";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { Board } from "@/types";
import { motion } from "framer-motion";

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

  const { user } = useUser();

  useEffect(() => {
    if (!isLoading && boards?.[0]) {
      setActiveBoard(boards[0]);
    }
  }, [boards, isLoading]);

  if (isLoading && showSidebar) {
    return (
      <div className="flex items-center">
        <Loader2 className="mr-2 h-6 w-6 animate-spin" />
        Loading boards
      </div>
    );
  } else if (!boards) {
    return <div className="">Add new board</div>;
  }

  const variants = {
    showSidebar: {
      x: 0,
    },
    hideSidebar: {
      x: "-16.25rem",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={{ x: "-16.25rem" }}
      animate={showSidebar ? "showSidebar" : "hideSidebar"}
    >
      <div className="h-full bg-white dark:bg-[#2b2c37]  pt-[1.875rem] pb-10 max-w-[16.25rem] hidden md:block border-r border-r-[#e4ebfa] dark:border-r-[#3e3f4e]">
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
          <div
            className={`py-[1.125rem] pl-[1.1875rem] pr-[4.375rem] flex items-center gap-[0.8125rem] rounded-r-[6.25rem] text-primary`}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
                fill="white"
                className={`fill-current`}
              />
            </svg>
            + Create New Board
          </div>
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
      </div>
    </motion.div>
  );
};

export default Sidebar;
