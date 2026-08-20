import type { LucideIcon } from "lucide-react";

interface DetailSectionHeaderProps {
  icon: LucideIcon;
  title: string;
}

/** Icon + title header shared by every project-detail section. */
export function DetailSectionHeader({ icon: Icon, title }: DetailSectionHeaderProps) {
  return (
    <div className="mb-8 flex items-center gap-4">
      <div className="rounded-2xl bg-primary/10 p-3 text-primary">
        <Icon className="size-7" />
      </div>
      <h2 className="type-h2">{title}</h2>
    </div>
  );
}
