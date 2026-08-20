import { cn } from "@/lib/utils";

type TagProps = React.ComponentPropsWithoutRef<"span">;

/** Small uppercase pill used for categories, types and status labels. */
export function Tag({ children, className, ...rest }: TagProps) {
  return (
    <span
      {...rest}
      className={cn(
        "rounded-xl bg-primary px-3 py-1 type-micro text-primary-foreground shadow-sm",
        className,
      )}
    >
      {children}
    </span>
  );
}
