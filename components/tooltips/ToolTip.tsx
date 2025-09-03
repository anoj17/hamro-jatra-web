import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface ToolTipProps {
  text: string;
  icon: React.ReactNode;
}

const ToolTip: React.FC<ToolTipProps> = ({ text, icon }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{icon}</TooltipTrigger>
        <TooltipContent className="m-2  bg-gray-500 text-sm text-white">
          <p>{text}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTip;
