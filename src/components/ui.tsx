import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

import { Icon } from "@/components/icons";
import { cn } from "@/lib/utils";

/* -------------------------------------------------------------- Container */

export function Container({
  className,
  children,
  size = "default",
}: {
  className?: string;
  children: ReactNode;
  size?: "default" | "narrow" | "wide";
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-5 sm:px-8",
        size === "narrow" && "max-w-3xl",
        size === "default" && "max-w-6xl",
        size === "wide" && "max-w-7xl",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- Section */

export function Section({
  className,
  children,
  id,
  as,
}: {
  className?: string;
  children: ReactNode;
  id?: string;
  as?: ElementType;
}) {
  const Tag = (as ?? "section") as ElementType;
  return (
    <Tag id={id} className={cn("py-20 sm:py-28", className)}>
      {children}
    </Tag>
  );
}

/* ---------------------------------------------------------------- Eyebrow */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50/70 px-3.5 py-1.5 text-[0.8125rem] font-medium tracking-tight text-brand-700",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------- SectionHeading */

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2
        className={cn(
          "text-balance text-3xl font-semibold tracking-[-0.02em] text-ink-900 sm:text-4xl md:text-[2.75rem] md:leading-[1.1]",
          eyebrow && "mt-5",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-pretty text-lg leading-8 text-ink-500">
          {description}
        </p>
      ) : null}
    </div>
  );
}

/* ----------------------------------------------------------------- Button */

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

const buttonBase =
  "group relative inline-flex select-none items-center justify-center gap-2 rounded-full font-medium tracking-tight transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:pointer-events-none disabled:opacity-55";

const buttonVariants: Record<ButtonVariant, string> = {
  primary:
    "bg-ink-900 text-white shadow-soft hover:-translate-y-0.5 hover:bg-ink-800 hover:shadow-lift active:translate-y-0",
  secondary:
    "border border-ink-200 bg-white text-ink-800 shadow-soft hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-lift active:translate-y-0",
  ghost: "text-ink-700 hover:bg-ink-50 hover:text-ink-900",
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-13 px-7 text-base",
};

export function buttonClass(
  variant: ButtonVariant = "primary",
  size: ButtonSize = "md",
  className?: string,
) {
  return cn(buttonBase, buttonVariants[variant], buttonSizes[size], className);
}

export function Button({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
  arrow,
  external,
  ...props
}: {
  href?: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
  arrow?: boolean;
  external?: boolean;
} & Omit<ComponentPropsWithoutRef<"button">, "className" | "children">) {
  const content = (
    <>
      {children}
      {arrow ? (
        <Icon
          name="arrowRight"
          className="size-4 transition-transform duration-300 group-hover:translate-x-1"
        />
      ) : null}
    </>
  );

  const classes = buttonClass(variant, size, className);

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {content}
    </button>
  );
}

/* ------------------------------------------------------------------- Card */

export function Card({
  className,
  children,
  interactive,
}: {
  className?: string;
  children: ReactNode;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-ink-100 bg-white/80 p-7 shadow-soft backdrop-blur-sm",
        interactive &&
          "transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:border-ink-200 hover:shadow-lift",
        className,
      )}
    >
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- IconBubble */

export function IconBubble({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white text-brand-600 shadow-[inset_0_1px_0_rgb(255_255_255)]",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------------- Pill */

export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-ink-100 bg-ink-50/80 px-3 py-1 text-[0.8125rem] font-medium text-ink-600",
        className,
      )}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------------------- Divider */

export function GradientRule({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "h-px w-full bg-gradient-to-r from-transparent via-ink-200 to-transparent",
        className,
      )}
    />
  );
}
