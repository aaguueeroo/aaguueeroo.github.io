const REVEAL_ROOT_MARGIN = "0px 0px -8% 0px";

// Elements stay visible unless this runs: the stylesheet only hides them under html.js.
export const initReveal = (root: ParentNode = document) => {
  const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");
  const reducedMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  if (reducedMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries
        .filter((entry) => entry.isIntersecting)
        .forEach((entry) => {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
    },
    { rootMargin: REVEAL_ROOT_MARGIN },
  );

  elements.forEach((element) => observer.observe(element));
};
