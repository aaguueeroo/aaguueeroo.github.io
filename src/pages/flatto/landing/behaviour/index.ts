import { initChoreDemo } from "./choreDemo";
import { initCopyAddress } from "./copyAddress";
import { initReveal } from "./reveal";
import { initShareLinks } from "./shareLink";
import { initStickyCta } from "./stickyCta";

// Everything here is an extra. The page is complete without it: every link works, every question
// opens, and both join buttons send the email.
initReveal();
initStickyCta();
initChoreDemo();
initCopyAddress();
initShareLinks();
