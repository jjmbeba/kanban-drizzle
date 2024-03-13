"use client";

import { useSidebarStore } from "@/store/sidebarStore";
import { useUser } from "@clerk/nextjs";
import React from "react";

const BoardOverview = () => {
  const showSidebar = useSidebarStore((state) => state.showSidebar);

  const { user } = useUser();

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
