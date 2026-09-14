import * as React from "react";
import { Button } from "./Button";
import { cn } from "../../lib/utils";

const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col", className)} {...props} />
));
Sidebar.displayName = "Sidebar";

const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center border-b px-4", className)}
    {...props}
  />
));
SidebarHeader.displayName = "SidebarHeader";

const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-1 overflow-auto py-2", className)}
    {...props}
  />
));
SidebarContent.displayName = "SidebarContent";

const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex h-14 items-center border-t px-4", className)}
    {...props}
  />
));
SidebarFooter.displayName = "SidebarFooter";

const SidebarNav = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-1 px-2 group-[.collapsed]:px-2", className)}
    {...props}
  />
));
SidebarNav.displayName = "SidebarNav";

const SidebarNavHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("grid gap-1 px-2", className)}
    {...props}
  />
));
SidebarNavHeader.displayName = "SidebarNavHeader";

interface SidebarNavHeaderTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  subTitle?: string;
}

const SidebarNavHeaderTitle = React.forwardRef<
  HTMLDivElement,
  SidebarNavHeaderTitleProps
>(({ className, children, subTitle, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col gap-1", className)}
    {...props}
  >
    <div className="text-lg font-semibold">{children}</div>
    {subTitle && <div className="text-xs text-muted-foreground">{subTitle}</div>}
  </div>
));
SidebarNavHeaderTitle.displayName = "SidebarNavHeaderTitle";

interface SidebarNavLinkProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  isCollapsed?: boolean;
  icon?: React.ReactNode;
  label?: string;
  badge?: React.ReactNode;
}

const SidebarNavLink = React.forwardRef<
  HTMLAnchorElement,
  SidebarNavLinkProps
>(({ className, children, isActive, isCollapsed, icon, label, badge, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "group flex h-9 items-center rounded-md px-3 text-sm font-medium",
      isActive
        ? "bg-accent text-accent-foreground"
        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      isCollapsed && "h-9 w-9 justify-center p-0",
      className
    )}
    {...props}
  >
    {icon && (
      <span className={cn("mr-2", isCollapsed && "mr-0")}>{icon}</span>
    )}
    {!isCollapsed && label && <span>{label}</span>}
    {!isCollapsed && badge && (
      <span className="ml-auto">{badge}</span>
    )}
    {children}
  </a>
));
SidebarNavLink.displayName = "SidebarNavLink";

interface SidebarNavLinkWithButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  isActive?: boolean;
  isCollapsed?: boolean;
  icon?: React.ReactNode;
  label?: string;
  buttonIcon?: React.ReactNode;
  buttonLabel?: string;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const SidebarNavLinkWithButton = React.forwardRef<
  HTMLAnchorElement,
  SidebarNavLinkWithButtonProps
>(({ className, isActive, isCollapsed, icon, label, buttonIcon, buttonLabel, onButtonClick, ...props }, ref) => (
  <div className="relative">
    <SidebarNavLink
      ref={ref}
      className={cn("pr-12", className)}
      isActive={isActive}
      isCollapsed={isCollapsed}
      icon={icon}
      label={label}
      {...props}
    />
    <div className="absolute right-1 top-1">
      <Button
        variant="ghost"
        size="sm"
        className="h-7 w-7"
        onClick={onButtonClick}
      >
        {buttonIcon}
        {buttonLabel && <span className="sr-only">{buttonLabel}</span>}
      </Button>
    </div>
  </div>
));
SidebarNavLinkWithButton.displayName = "SidebarNavLinkWithButton";

interface SidebarNavSectionProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  isCollapsed?: boolean;
}

const SidebarNavSection = React.forwardRef<
  HTMLDivElement,
  SidebarNavSectionProps
>(({ className, children, title, isCollapsed, ...props }, ref) => (
  <div ref={ref} className={cn("grid gap-1", className)} {...props}>
    {title && (
      <div
        className={cn(
          "text-xs font-medium text-muted-foreground",
          isCollapsed && "sr-only"
        )}
      >
        {title}
      </div>
    )}
    {children}
  </div>
));
SidebarNavSection.displayName = "SidebarNavSection";

interface SidebarNavSectionLabelProps
  extends React.HTMLAttributes<HTMLDivElement> {
  isCollapsed?: boolean;
}

const SidebarNavSectionLabel = React.forwardRef<
  HTMLDivElement,
  SidebarNavSectionLabelProps
>(({ className, children, isCollapsed, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-xs font-medium text-muted-foreground",
      isCollapsed && "sr-only",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
SidebarNavSectionLabel.displayName = "SidebarNavSectionLabel";

export {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarNav,
  SidebarNavHeader,
  SidebarNavHeaderTitle,
  SidebarNavLink,
  SidebarNavLinkWithButton,
  SidebarNavSection,
  SidebarNavSectionLabel,
};
