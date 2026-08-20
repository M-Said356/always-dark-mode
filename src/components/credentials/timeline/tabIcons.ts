import { BadgeCheck, Building2, GraduationCap, Layers, type LucideIcon } from "lucide-react";
import type { CredentialTab } from "@/data";

/** Icon shown for each credential tab. */
export const tabIcons: Record<CredentialTab, LucideIcon> = {
  work: Building2,
  projects: Layers,
  education: GraduationCap,
  certifications: BadgeCheck,
};
