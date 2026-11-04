import { cache } from "react";
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
/**
 * Loads projects via Supabase's PostgREST endpoint using a plain `fetch`.
 *
 * We call REST directly (instead of supabase-js) so network errors surface
 * with their real cause, and so we can apply an explicit timeout. This mirrors
 * the exact request a browser/curl makes against the public anon API.
 */
export const getProjects = cache(async (): Promise<Project[]> => {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !anonKey) return SAMPLE_PROJECTS;

  const baseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const endpoint = `${baseUrl}/rest/v1/${TABLE}?select=*&order=created_at.desc`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const response = await fetch(endpoint, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    if (!response.ok) {
      const body = await response.text().catch(() => "");
      console.error(`[projects] Supabase responded ${response.status}:`, body.slice(0, 300));
      return SAMPLE_PROJECTS;
    }

    const rows = (await response.json()) as ProjectRow[];
    if (!Array.isArray(rows) || rows.length === 0) return [];
    return rows.map(normalize);
  } catch (error) {
    // Log the full cause chain — network failures from a proxy/TLS issue carry
    // the real reason in error.cause, which `String(error)` hides.
    const err = error as Error & { cause?: unknown };
    console.error("[projects] Supabase fetch failed:", err.message, err.cause ?? "");
    return SAMPLE_PROJECTS;
  } finally {
    clearTimeout(timeout);
  }
});
