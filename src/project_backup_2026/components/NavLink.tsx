import { Link } from "react-router-dom";
import { forwardRef, AnchorHTMLAttributes } from "react";
import { cn } from "../lib/utils";

interface NavLinkCompatProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  className?: string;
  activeClassName?: string;
}

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, to, ...props }, ref) => {
    // Simple active check based on current path
    const isActive = typeof window !== 'undefined' && window.location.pathname === to;

    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
