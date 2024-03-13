"use client";

import Image from "next/image";
import React, { useState } from "react";
import NavbarActions from "./NavbarActions";
import { useSidebarStore } from "@/store/sidebarStore";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const Navbar = () => {
  const showSidebar = useSidebarStore((state) => state.showSidebar);
  const { theme } = useTheme();

  const variants = {
    showSidebar: {
      paddingRight: "5.65rem",
      transition: { duration: 0.5 },
    },
    hideSidebar: {
      paddingRight: "1.5625rem",
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="flex items-center gap-4 py-4 md:py-0 px-4 bg-white dark:bg-[#2b2c37] ">
      <div className="relative h-6 w-6 md:hidden">
        <Image priority src={"/logo-mobile.svg"} alt="logo" fill />
      </div>
      <motion.div
        variants={variants}
        animate={showSidebar ? "showSidebar" : "hideSidebar"}
        initial={{
          paddingRight: "1.5625rem",
        }}
        className={`md:py-[1.4375rem] hidden md:block border-r border-r-[#e4ebfa] dark:border-r-[#3e3f4e] transition-all duration-300`}
      >
        <div className="relative h-[1.57625rem] w-[9.533125rem] hidden md:block">
          <Image
            priority
            src={theme === "light" ? "/logo-light.svg" : "/logo-dark.svg"}
            alt="logo"
            fill
          />
        </div>
      </motion.div>
      <NavbarActions />
    </div>
  );
};

export default Navbar;
