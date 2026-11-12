import { cache } from "react";

export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  description: string;
  category: string;
  dateLabel: string;
  link: string | null;
  imageUrl: string | null;
};

const TABLE = "achievements";

type AchievementRow = Record<string, unknown>;

function str(row: AchievementRow, ...keys: string[]): string {
  for (const key of keys) {
    const value = row[key];
    if (typeof value === "string" && value.trim()) return value.trim();
    if (typeof value === "number") return String(value);
  }
  return "";
}

function strOrNull(row: AchievementRow, ...keys: string[]): string | null {
  const value = str(row, ...keys);
  return value ? value : null;
}

function normalize(row: AchievementRow, index: number): Achievement {
  return {
    id: str(row, "id") || `achievement-${index}`,
    title: str(row, "title", "name") || "Untitled achievement",
    issuer: str(row, "issuer", "organization", "org"),
    description: str(row, "description"),
    category: str(row, "category", "type"),
    dateLabel: str(row, "date_label", "date", "year"),
    link: strOrNull(row, "link", "url", "credential_url"),
    imageUrl: strOrNull(row, "image_url", "image", "badge_url"),
  };
}

/** Placeholder data shown when Supabase isn't configured yet. */
const SAMPLE_ACHIEVEMENTS: Achievement[] = [
  {
    id: "sample-1",
    title: "Connect Supabase to see your achievements",
    issuer: "Setup",
    description:
      "Run supabase/achievements.sql in the Supabase SQL Editor, then make sure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in .env.local. These sample cards will be replaced by your real `achievements` rows.",
    category: "Setup",
    dateLabel: "2026",
    link: null,
    imageUrl: null,
  },
];

export const getAchievements = cache(async (): Promise<Achievement[]> => {
  const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!rawUrl || !anonKey) return SAMPLE_ACHIEVEMENTS;

  const baseUrl = rawUrl.trim().replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  const order = "order=sort_order.asc.nullslast,created_at.desc";
  const endpoint = `${baseUrl}/rest/v1/${TABLE}?select=*&${order}`;

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
      console.error(`[achievements] Supabase responded ${response.status}:`, body.slice(0, 300));
      return SAMPLE_ACHIEVEMENTS;
    }

    const rows = (await response.json()) as AchievementRow[];
    if (!Array.isArray(rows) || rows.length === 0) return [];
    return rows.map(normalize);
  } catch (error) {
    const err = error as Error & { cause?: unknown };
    console.error("[achievements] Supabase fetch failed:", err.message, err.cause ?? "");
    return SAMPLE_ACHIEVEMENTS;
  } finally {
    clearTimeout(timeout);
  }
});
