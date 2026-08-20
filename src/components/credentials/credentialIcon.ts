import {
  Award,
  Compass,
  Container,
  Database,
  Languages,
  Rocket,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const ICONS: LucideIcon[] = [Award, Compass, ShieldCheck, Rocket, Database, Container, Languages];

/** Deterministic icon per credential id, so a card always shows the same glyph. */
export function iconForCredential(id: string): LucideIcon {
  let sum = 0;
  for (const ch of id) sum += ch.charCodeAt(0);
  return ICONS[sum % ICONS.length] ?? Award;
}
