
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type LoadingProps = {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  className?: string;
  text?: string;
};

export function Loading({
  size = "md",
  fullScreen = false,
  className,
  text
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-6 w-6 border-2",
    md: "h-12 w-12 border-b-2",
    lg: "h-16 w-16 border-b-3",
  };

  const container = fullScreen ? "min-h-screen" : "min-h-[200px]";

  return (
    <div className={cn(
      container,
      "flex flex-col items-center justify-center",
      className
    )}>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn(
          "animate-spin rounded-full border-primary",
          sizeClasses[size]
        )}
      />
      {text && (
        <motion.p 
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-muted-foreground"
        >
          {text}
        </motion.p>
      )}
    </div>
  );
}
