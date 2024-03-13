import React from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const AddTaskButton = () => {
  return (
    <Button>
      <Plus className="md:hidden" />
      <span className="hidden md:inline-block">+ Add new task</span>
    </Button>
  );
};

export default AddTaskButton;
