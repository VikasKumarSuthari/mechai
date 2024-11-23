// src/components/ui/alert.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Alert = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-start space-x-4 rounded-lg border border-red-500 bg-red-100 p-4 text-red-700",
      className
    )}
    {...props}
  />
));
Alert.displayName = "Alert";

const AlertDescription = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm leading-tight", className)}
    {...props}
  />
));
AlertDescription.displayName = "AlertDescription";

export { Alert, AlertDescription };
