"use client";

import { useRouter } from "next/navigation";

type BackButtonProps = {
  fallbackHref: string;
  ariaLabel: string;
  className?: string;
};

export default function BackButton({ fallbackHref, ariaLabel, className }: BackButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    // Prefer real back-navigation (returns to where the user came from).
    // If there is no history entry (e.g., direct open/new tab), fall back to a safe route.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
      return;
    }

    router.push(fallbackHref);
  };

  return (
    <button type="button" aria-label={ariaLabel} onClick={handleClick} className={className}>
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}
