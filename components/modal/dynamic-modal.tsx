"use client";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { cn } from "@/lib/utils";

interface DynamicModalProps {
  isOpen?: boolean;
  onClose: () => void;
  onConfirm?: () => void;
  loading?: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

export const DynamicModal: React.FC<DynamicModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description,
  children,
  className,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  const onChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onChange}>
      <DialogContent
        className={cn(
          "z-[52] max-w-[1000px] lg:mt-0", // Positioning and max-width
          "max-h-[80vh] md:max-h-[90vh] lg:max-h-[90vh]", // Dynamic height with max limit
          "overflow-y-auto scrollbar-none", // Enable internal scrolling and hide scrollbar
          "flex flex-col", // Important: Make DialogContent a flex container
          className
        )}
      >
        <DialogHeader>
          <DialogTitle className="text-start text-xl">{title}</DialogTitle>
          <DialogDescription className="text-start text-xs text-black">
            {description}
          </DialogDescription>
        </DialogHeader>
        <div className="items center flex w-full justify-center ">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
};
