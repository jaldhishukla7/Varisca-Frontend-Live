import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  className?: string;
}

export const LoadingSpinner = ({ fullScreen = false, className }: LoadingSpinnerProps) => (
  <div
    className={cn(
      "flex flex-col items-center justify-center py-10",
      fullScreen ? "min-h-screen" : "h-full",
      className,
    )}
  >
    <Loader2 className="mb-2 h-8 w-8 animate-spin text-primary" />
    <p className="text-sm text-muted-foreground">Please wait...</p>
  </div>
);
