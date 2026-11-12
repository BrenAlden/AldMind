import "@/components/achievement/styles/achievement.css";
import { AchievementPage } from "@/components/achievement/achievement-page";
import { getAchievements } from "@/lib/achievements";

// Achievements are fetched fresh at request time (public read-only data).
export const dynamic = "force-dynamic";

export default async function Achievement() {
  const achievements = await getAchievements();
  return <AchievementPage achievements={achievements} />;
}
