"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const ThemeToggle = () => {
  if (!localStorage.getItem("theme")) {
    localStorage.setItem("theme", "light");
  }

  const { setTheme } = useTheme();
  const [checked, setChecked] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (checked) {
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, [setTheme, checked]);

  return (
    <div className="bg-[#F4F7FD] dark:bg-[#20212C]  w-[14.6875rem] py-[0.875rem] rounded flex items-center justify-center gap-[1.5rem]">
      <Sun className="w-[1.125rem] h-[1.125rem]" />
      <Switch checked={checked} onCheckedChange={setChecked} />
      <Moon className="w-[1.125rem] h-[1.125rem]" />
    </div>
  );
};

export default ThemeToggle;
