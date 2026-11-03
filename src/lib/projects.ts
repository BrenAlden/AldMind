import { cache } from "react";
import { getSupabase } from "./supabase";

/**
 * Normalized project shape consumed by the UI.
 * Maps the Supabase `projects` table columns onto a clean shape.
 */
export type Project = {
  id: string;
  title: string;
  description: string;
  category: string;
  role: string;
  contributor: string;
  year: string;
  tags: string[];
  link: string | null;
  imageUrl: string | null;
};

/** The Supabase table to read from. */
const TABLE = "projects";

/** Raw row — permissive to tolerate nulls. */
type ProjectRow = Record<string, unknown>;

function str(row: ProjectRow, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function strOrNull(row: ProjectRow, ...keys: string[]): string | null {
  const value = str(row, ...keys);
  return value ? value : null;
}

function strArray(row: ProjectRow, ...keys: string[]): string[] {
  for (const key of keys) {
    const value = row[key];
    if (Array.isArray(value)) {
      return value.map((v) => String(v)).filter(Boolean);
    }
    if (typeof value === "string" && value.trim()) {
      // Support comma-separated strings as a fallback.
      return value.split(",").map((v) => v.trim()).filter(Boolean);
    }
  }
  return [];
}

function yearFrom(row: ProjectRow): string {
  const created = row["created_at"];
  if (typeof created === "string" && created) {
    const parsed = new Date(created);
    if (!Number.isNaN(parsed.getTime())) return String(parsed.getFullYear());
  }
  return "";
}

function normalize(row: ProjectRow, index: number): Project {
  return {
    id: str(row, "id") || `project-${index}`,
    title: str(row, "project_name", "title", "name") || "Untitled project",
    description: str(row, "description"),
    category: str(row, "category"),
    role: str(row, "Role", "role"),
    contributor: str(row, "contributor"),
    year: yearFrom(row),
    tags: strArray(row, "skill", "skills", "tags"),
    link: strOrNull(row, "project_link", "link", "url"),
    imageUrl: strOrNull(row, "image_url", "image"),
  };
}

/** Placeholder data shown when Supabase isn't configured yet. */
const SAMPLE_PROJECTS: Project[] = [
  {
    id: "sample-1",
    title: "Connect Supabase to see your projects",
    description:
      "Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local, then restart the dev server. These sample cards will be replaced by your real `projects` table rows.",
    category: "Setup",
    role: "",
    contributor: "",
    year: "2026",
    tags: ["Supabase", "Next.js"],
    link: null,
    imageUrl: null,
  },
];

/**
 * Loads projects from Supabase, newest first (by created_at).
 * Cached per-request via React.cache so multiple components share one query.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const supabase = getSupabase();
  if (!supabase) return SAMPLE_PROJECTS;

  const { data, error } = await supabase
    .from(TABLE)
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("[projects] Supabase query failed:", error.message);
    return SAMPLE_PROJECTS;
  }

  if (!data || data.length === 0) return [];
  return data.map(normalize);
});
