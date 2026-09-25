import { createFileRoute } from "@tanstack/react-router";
import { useIsMobile } from "@/hooks/use-mobile";

export const Route = createFileRoute("/committee")({
  component: CommitteePage,
});

function CommitteePage() {
  const isMobile = useIsMobile();
  return isMobile ? (
    <div className="p-4">Committee (mobile) — build MobileCommittee.tsx next</div>
  ) : (
    <div className="p-4">Committee (desktop) — coming soon</div>
  );
}