import { createFileRoute } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/support")({
  component: SupportPage,
});

function SupportPage() {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className="p-4">Support (mobile) — build MobileSupport.tsx next</div>
  ) : (
    <div className="p-4">Support (desktop) — coming soon</div>
  );
}