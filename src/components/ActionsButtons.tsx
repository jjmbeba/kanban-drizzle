"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const ActionsButtons = () => {
  return (
    <div>
      <Button>
        <Plus className="md:hidden" />
        <span className="hidden md:inline-block">+ Add new task</span>
      </Button>
    </div>
  );
};

export default ActionsButtons;
