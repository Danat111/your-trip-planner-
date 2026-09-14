import * as React from "react";
import { cn } from "../../lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "primary" | "secondary" | "dark";
  container?: boolean;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
}

const Section = React.forwardRef<HTMLDivElement, SectionProps>(
  ({ 
    className, 
    variant = "default", 
    container = true, 
    spacing = "lg",
    children,
    ...props 
  }, ref) => {
    const variants = {
      default: "bg-white",
      primary: "bg-blue-50",
      secondary: "bg-gray-50",
      dark: "bg-gray-900 text-white",
    };

    const spacings = {
      none: "py-0",
      sm: "py-8",
      md: "py-12",
      lg: "py-16",
      xl: "py-24",
    };

    return (
      <section
        ref={ref}
        className={cn(variants[variant], spacings[spacing], className)}
        {...props}
      >
        <div className={cn(container && "container mx-auto px-4 md:px-6")}>
          {children}
        </div>
      </section>
    );
  }
);

Section.displayName = "Section";

export { Section };
