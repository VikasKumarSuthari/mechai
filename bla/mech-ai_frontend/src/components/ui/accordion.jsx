// src/components/ui/accordion.jsx
import * as React from "react";
import { cn } from "@/lib/utils";

const Accordion = ({ children, className, ...props }) => {
  return (
    <div className={cn("border rounded-lg divide-y", className)} {...props}>
      {children}
    </div>
  );
};

const AccordionItem = ({ children, className, ...props }) => {
  return (
    <div className={cn("p-4", className)} {...props}>
      {children}
    </div>
  );
};

const AccordionTrigger = ({ children, className, ...props }) => {
  return (
    <button
      className={cn(
        "w-full text-left text-lg font-medium focus:outline-none",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

const AccordionContent = ({ children, className, ...props }) => {
  return (
    <div className={cn("text-sm mt-2", className)} {...props}>
      {children}
    </div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
