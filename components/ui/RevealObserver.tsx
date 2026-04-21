"use client";

import { useEffect } from "react";

/**
 * Mounts an IntersectionObserver that adds the "in" class to any element
 * with class "reveal" once it scrolls into view.
 * This component renders nothing — it only runs a side-effect.
 */
export default function RevealObserver() {
  useEffect(() => {
    document.documentElement.classList.add("js-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return null;
}
