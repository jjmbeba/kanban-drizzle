"use client";

import React from "react";
import { motion } from "framer-motion";
import { useSidebarStore } from "@/store/sidebarStore";

type Props = {
  children: React.ReactNode;
};

const BodyWrapper = ({ children }: Props) => {
  const [showSidebar] = useSidebarStore((state) => [state.showSidebar]);

  const variants = {
    showSidebar: {
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
    hideSidebar: {
      x: "-16.25rem",
      transition: {
        duration: 0.5,
      },
      width: "calc(1308px+16.25rem)",
    },
  };

  return (
    <motion.div
      variants={variants}
      initial={{ x: "-16.25rem" }}
      animate={showSidebar ? "showSidebar" : "hideSidebar"}
      className={`flex h-[calc(100%-4.4511875rem)]`}
    >
      {children}
    </motion.div>
  );
};

export default BodyWrapper;
