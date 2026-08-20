import { useMemo } from "react";
import { credentials, type CredentialItem } from "@/data";

/** Always 3 slides × exactly 3 credentials (wraps around when data runs out). */
export function useCredentialSlides(): CredentialItem[][] {
  return useMemo(() => {
    const items = credentials.filter((c) => c.tab === "certifications" || c.tab === "education");
    if (!items.length) return [];
    return Array.from({ length: 3 }, (_, s) =>
      [0, 1, 2].map((j) => items[(s * 3 + j) % items.length]!),
    );
  }, []);
}
