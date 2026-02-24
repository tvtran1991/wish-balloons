export const CATEGORIES = [
  { id: "health", label: "Health", icon: "heart" },
  { id: "relationship", label: "Relationship", icon: "people" },
  { id: "family", label: "Family", icon: "house" },
  { id: "career", label: "Career", icon: "briefcase" },
  { id: "finance", label: "Finance", icon: "building" },
  { id: "misc", label: "Misc", icon: "sparkles" },
] as const;

export type CategoryId = (typeof CATEGORIES)[number]["id"];
