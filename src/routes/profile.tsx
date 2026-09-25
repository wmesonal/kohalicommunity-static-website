import { createFileRoute } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/profile")({
  component: ProfilePage,
});

function ProfilePage() {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className="p-4">Profile (mobile) — build MobileProfile.tsx next</div>
  ) : (
    <div className="p-4">Profile (desktop) — coming soon</div>
  );
}