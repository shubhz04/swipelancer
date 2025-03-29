import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface IconButtonProps {
  icon: ReactNode;
  onClick: () => void;
  className?: string;
}

export default function IconButton({ icon, onClick, className }: IconButtonProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn("rounded-full p-3 shadow-md hover:scale-105 transition", className)}
    >
      {icon}
    </Button>
  );
}
