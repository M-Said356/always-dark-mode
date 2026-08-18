/**
 * Data module index
 * Centralized exports for all data types and constants
 */

// Projects
export { projects, projectFilters, type Project } from "./projects";

// Skills
export { skillGroups, type SkillIcon } from "./skills";

// Credentials (certifications, education, awards)
export {
  credentials,
  credentialTabs,
  type CredentialItem,
  type CredentialTab,
} from "./credentials";
