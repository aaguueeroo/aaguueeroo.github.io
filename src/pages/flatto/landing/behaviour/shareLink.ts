// Upgrades the WhatsApp link to the phone's own share sheet, so any flat chat app works. Where the
// browser has no share sheet, the link keeps going to WhatsApp.
export const initShareLinks = (root: ParentNode = document) => {
  if (!navigator.share) return;

  root.querySelectorAll<HTMLAnchorElement>("[data-share-text]").forEach((link) => {
    link.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        await navigator.share({ text: link.dataset.shareText });
      } catch {
        // Closing the share sheet counts as an error, and there's nothing to do about it.
      }
    });
  });
};
