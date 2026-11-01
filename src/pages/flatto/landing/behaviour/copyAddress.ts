const COPIED_LABEL_MS = 2000;

// The button stays hidden where the browser can't copy. The address is on the page either way.
export const initCopyAddress = (root: ParentNode = document) => {
  if (!navigator.clipboard) return;

  root.querySelectorAll<HTMLButtonElement>("[data-copy]").forEach((button) => {
    const label = button.textContent;
    button.hidden = false;

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.copy ?? "");
        button.textContent = button.dataset.copiedLabel ?? label;
        window.setTimeout(() => {
          button.textContent = label;
        }, COPIED_LABEL_MS);
      } catch {
        // Copying was refused. The address is still there to select by hand.
      }
    });
  });
};
