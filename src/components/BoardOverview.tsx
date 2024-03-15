"use client";

import { useSidebarStore } from "@/store/sidebarStore";

const BoardOverview = () => {
  const showSidebar = useSidebarStore((state) => state.showSidebar);

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
