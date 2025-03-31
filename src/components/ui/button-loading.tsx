
import { ButtonHTMLAttributes, forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

interface ButtonLoadingProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  loadingText?: string;
}

const ButtonLoading = forwardRef<HTMLButtonElement, ButtonLoadingProps>(
  (
    {
      className,
      variant,
      size,
      isLoading = false,
      loadingText,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <Button
        className={cn(className)}
        variant={variant}
        size={size}
        ref={ref}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <span className="flex items-center">
            <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-b-transparent"></span>
            {loadingText || children}
          </span>
        ) : (
          children
        )}
      </Button>
    );
  }
);

ButtonLoading.displayName = "ButtonLoading";

export { ButtonLoading };
