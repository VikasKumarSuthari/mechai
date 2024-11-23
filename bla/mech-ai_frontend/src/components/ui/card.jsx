// src/components/ui/card.jsx
import * as React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const Card = React.forwardRef(({ className, theme = "default", role = "region", ...props }, ref) => {
  const themes = {
    default: "bg-card text-card-foreground",
    dark: "bg-gray-800 text-white",
    light: "bg-white text-gray-800",
  };

  return (
    <div
      ref={ref}
      className={cn("rounded-lg border shadow-sm", themes[theme], className)}
      role={role}
      {...props}
    />
  );
});
Card.displayName = "Card";
Card.propTypes = {
  className: PropTypes.string,
  theme: PropTypes.oneOf(["default", "dark", "light"]),
  role: PropTypes.string,
};
Card.defaultProps = {
  className: "",
  theme: "default",
  role: "region",
};

const CardHeader = React.forwardRef(({ className, role = "heading", ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    role={role}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";
CardHeader.propTypes = {
  className: PropTypes.string,
  role: PropTypes.string,
};
CardHeader.defaultProps = {
  className: "",
  role: "heading",
};

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";
CardTitle.propTypes = {
  className: PropTypes.string,
};
CardTitle.defaultProps = {
  className: "",
};

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";
CardDescription.propTypes = {
  className: PropTypes.string,
};
CardDescription.defaultProps = {
  className: "",
};

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";
CardContent.propTypes = {
  className: PropTypes.string,
};
CardContent.defaultProps = {
  className: "",
};

const CardFooter = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";
CardFooter.propTypes = {
  className: PropTypes.string,
};
CardFooter.defaultProps = {
  className: "",
};

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
