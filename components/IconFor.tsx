import {
  Activity,
  Brain,
  Heart,
  Scissors,
  Smile,
  Sparkles,
  Stethoscope,
  type LucideIcon,
} from "lucide-react";
import type { IconName } from "@/lib/types";

const map: Record<IconName, LucideIcon> = {
  activity: Activity,
  sparkles: Sparkles,
  brain: Brain,
  smile: Smile,
  heart: Heart,
  scissors: Scissors,
  stethoscope: Stethoscope,
};

export function IconFor({
  name,
  className,
}: {
  name: IconName;
  className?: string;
}) {
  const Cmp = map[name] ?? Sparkles;
  return <Cmp className={className} aria-hidden />;
}
