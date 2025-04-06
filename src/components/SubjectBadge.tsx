
import React from "react";
import { cn } from "@/lib/utils";

interface SubjectBadgeProps {
  name: string;
  color: string;
  className?: string;
}

const SubjectBadge = ({ name, color, className }: SubjectBadgeProps) => {
  const getColorClasses = () => {
    switch (color) {
      case "purple":
        return "bg-study-purple text-white";
      case "blue":
        return "bg-study-blue text-white";
      case "green":
        return "bg-study-green text-white";
      case "red":
        return "bg-study-red text-white";
      case "orange":
        return "bg-study-orange text-white";
      case "pink":
        return "bg-study-pink text-white";
      case "yellow":
        return "bg-study-yellow text-black";
      case "indigo":
        return "bg-study-indigo text-white";
      default:
        return "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <span
      className={cn(
        "inline-flex px-2.5 py-0.5 rounded-full text-xs font-medium",
        getColorClasses(),
        className
      )}
    >
      {name}
    </span>
  );
};

export default SubjectBadge;
