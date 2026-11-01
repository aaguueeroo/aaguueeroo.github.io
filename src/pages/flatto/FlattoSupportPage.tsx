import { Link } from "@mui/material";

import FlattoPage, { Email, P } from "./FlattoPage";
import { Flatto } from "./flattoBrand";

// Support page of the Flatto app. Linked from the app's Account settings and meant for the stores'
// support URL, so its path (/flatto/support) must not change.

const TITLE = "Flatto Support";
const DESCRIPTION = "How to get help with the Flatto app, report a user or inappropriate content, or delete your account.";
const PAGE_URL = "https://juliaaguero.com/flatto/support";

const FlattoSupportPage = () => (
  <FlattoPage
    title={TITLE}
    description={DESCRIPTION}
    url={PAGE_URL}
    intro={
      <>
        Need help, or want to report a user or inappropriate content? Write to <Email />. Include your account email and,
        for a report, what happened and in which flat. We aim to reply within a few days.
      </>
    }
  >
    <P>
      To delete your account, follow the steps in the{" "}
      <Link href="/flatto/privacy-policy#delete-account" sx={{ color: Flatto.tealDeep }}>
        Privacy Policy
      </Link>
      .
    </P>
  </FlattoPage>
);

export default FlattoSupportPage;
