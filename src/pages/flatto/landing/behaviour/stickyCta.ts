// Shows the bar only while nothing marked data-hides-sticky-cta is on screen, so a phone never
// shows two ways to join at once.
export const initStickyCta = (root: ParentNode = document) => {
  const bar = root.querySelector<HTMLElement>("[data-sticky-cta]");
  const blockers = root.querySelectorAll("[data-hides-sticky-cta]");

  if (!bar || blockers.length === 0 || !("IntersectionObserver" in window)) return;

  const onScreen = new Set<Element>();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) onScreen.add(entry.target);
      else onScreen.delete(entry.target);
    });
    bar.classList.toggle("is-visible", onScreen.size === 0);
  });

  blockers.forEach((blocker) => observer.observe(blocker));
};
