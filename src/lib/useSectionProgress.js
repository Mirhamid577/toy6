import { useEffect } from "react";
import { useMotionValue } from "framer-motion";

/*
 * Chorlove shablonidagi scroll-progress hisoblagichi.
 * kind = "hero"      -> section yuqoriga chiqqanda 0 -> 1
 * kind = "generic"   -> section ekranga kirganda 0 -> 1
 * kind = "footer"    -> sahifa oxiriga yaqinlashganda 0 -> 1
 */
export function useSectionProgress(ref, kind = "generic") {
  const progress = useMotionValue(0);

  useEffect(() => {
    let raf = 0;
    let scrollParent = null;

    if (kind === "footer") {
      let node = ref.current?.parentElement ?? null;
      while (node) {
        const overflowY = window.getComputedStyle(node).overflowY;
        if (overflowY === "auto" || overflowY === "scroll") {
          scrollParent = node;
          break;
        }
        node = node.parentElement;
      }
    }

    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const el = ref.current;
        if (!el) return;

        if (kind === "footer") {
          if (scrollParent) {
            if (
              scrollParent.scrollTop + scrollParent.clientHeight >=
              scrollParent.scrollHeight - 30
            ) {
              progress.set(1);
              return;
            }
          } else if (
            window.innerHeight + window.scrollY >=
            document.documentElement.scrollHeight - 30
          ) {
            progress.set(1);
            return;
          }
          const rect = el.getBoundingClientRect();
          const viewport = scrollParent?.clientHeight || window.innerHeight;
          const p = Math.min(
            1,
            Math.max(
              0,
              (viewport - rect.top) /
                Math.max(Math.min(0.5 * rect.height, 300), 1)
            )
          );
          progress.set(p);
          return;
        }

        const rect = el.getBoundingClientRect();
        if (kind === "hero") {
          const p = Math.min(
            1,
            Math.max(0, -rect.top / Math.max(0.9 * rect.height, 1))
          );
          progress.set(p);
          return;
        }

        const viewport = window.innerHeight;
        const total = viewport + rect.height;
        const p = Math.min(
          1,
          Math.max(0, (viewport - rect.top) / Math.max(total, 1))
        );
        progress.set(p);
      });
    };

    update();
    window.addEventListener("scroll", update, { passive: true, capture: true });
    window.addEventListener("resize", update, { passive: true });
    scrollParent?.addEventListener("scroll", update, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
      scrollParent?.removeEventListener("scroll", update);
    };
  }, [ref, progress, kind]);

  return progress;
}
