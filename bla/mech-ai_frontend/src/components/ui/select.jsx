import React, { useState } from "react";
import { cn } from "@/lib/utils";

const Select = ({ value, onValueChange, children, className, ...props }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <div className={cn("relative", className)} {...props}>
      {React.Children.map(children, (child) =>
        React.isValidElement(child)
          ? React.cloneElement(child, {
              value,
              onChange: onValueChange,
              isOpen,
              toggleOpen,
            })
          : child
      )}
    </div>
  );
};

const SelectTrigger = ({ className, children, toggleOpen, ...props }) => (
  <div
    className={cn(
      "cursor-pointer p-2 border rounded-md flex items-center justify-between",
      className
    )}
    onClick={toggleOpen}
    {...props}
  >
    {children}
  </div>
);

const SelectValue = ({ value, placeholder, className, ...props }) => (
  <span className={cn("text-sm font-medium", className)} {...props}>
    {value || placeholder}
  </span>
);

const SelectContent = ({ children, isOpen, className, ...props }) => (
  isOpen && (
    <div
      className={cn("absolute z-10 mt-2 bg-white border rounded-md", className)}
      {...props}
    >
      {children}
    </div>
  )
);

const SelectItem = ({ value, children, onChange, className }) => (
  <div
    className={cn("p-2 hover:bg-gray-100 cursor-pointer", className)}
    onClick={() => {
      if (typeof onChange === "function") onChange(value);
    }}
  >
    {children}
  </div>
);

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem };
