import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="section-y text-center">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="type-lead text-muted-foreground">{message}</p>
    </div>
  );
}
