"use client";

import { getBoards } from "@/db/actions";
import { useSidebarStore } from "@/store/sidebarStore";
import { useUser } from "@clerk/nextjs";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const BoardOverview = () => {
  const showSidebar = useSidebarStore((state) => state.showSidebar);

  const { user } = useUser();

  const { data } = useQuery({
    queryKey: ["boards"],
    queryFn: async () => {
      if (!user) return;

      return await getBoards(user);
    },
  });

  console.log(data);

  return (
    <div
      className={`transition-all duration-150 ${
        showSidebar ? "translate-x-0" : "translate-x-[-16.25rem]"
      }`}
    >
      BoardOverview
    </div>
  );
};

export default BoardOverview;
