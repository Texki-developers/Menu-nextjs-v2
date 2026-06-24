import { Avatar } from "@/components/atoms/Avatar";
import { cn } from "@/lib/utils";

interface Person {
  ini: string;
  color: string;
}

interface AvatarStackProps {
  people: Person[];
  size?: number;
  ringColor?: string;
  className?: string;
}

/** Overlapping participant ribbon (RTL-aware via logical margins). */
export function AvatarStack({ people, size = 32, ringColor = "#fff", className }: AvatarStackProps) {
  return (
    <div className={cn("flex items-center", className)}>
      {people.map((p, i) => (
        <Avatar
          key={`${p.ini}-${i}`}
          ini={p.ini}
          color={p.color}
          size={size}
          ring
          ringColor={ringColor}
          className={i > 0 ? "-ms-2" : ""}
        />
      ))}
    </div>
  );
}
