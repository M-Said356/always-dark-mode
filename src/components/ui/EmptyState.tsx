import { ReactNode } from "react";

interface EmptyStateProps {
  message: string;
  icon?: ReactNode;
}

export function EmptyState({ message, icon }: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      {icon && <div className="mb-4 flex justify-center">{icon}</div>}
      <p className="text-lg text-muted-foreground">{message}</p>
    </div>
  );
}
