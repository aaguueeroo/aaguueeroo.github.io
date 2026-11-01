import { Box, Link } from "@mui/material";
import { ReactNode } from "react";

import FlattoPage, { Email, P, SectionTitle } from "./FlattoPage";
import { Flatto } from "./flattoBrand";

// Terms of use of the Flatto app. Linked from the app's sign-in screens and Account settings, so
// its path (/flatto/terms) must not change. Flatto has no minimum age: the privacy policy says so
// in its section on children, and these terms must not contradict it.

const LAST_UPDATED = "1 November 2026";

const TITLE = "Flatto Terms of Use";
const DESCRIPTION = "The terms for using the Flatto app: your account, your content, acceptable use and how to leave.";
const PAGE_URL = "https://juliaaguero.com/flatto/terms";

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <Box component="section">
    <SectionTitle>{title}</SectionTitle>
    {children}
  </Box>
);

const FlattoTermsPage = () => (
  <FlattoPage
    title={TITLE}
    description={DESCRIPTION}
    url={PAGE_URL}
    lastUpdated={LAST_UPDATED}
    intro={
      'These terms are between you and Julia Agüero, the developer of Flatto, based in Spain ("we", "us"). By using Flatto you agree to them.'
    }
  >
    <Section title="Your account">
      <P>Keep your sign-in details safe and give accurate information.</P>
    </Section>

    <Section title="Your content">
      <P>
        You keep ownership of what you add. You let us store it and show it to the members of your flat so the app can
        work.
      </P>
    </Section>

    <Section title="Acceptable use">
      <P>
        Do not post anything illegal, abusive, hateful or harassing, and do not try to access other people's data or
        disrupt the service. We may remove content or suspend accounts that break these rules. There is no tolerance for
        objectionable content or abusive users. Flat owners can remove members, and you can report a problem by writing
        to <Email />.
      </P>
    </Section>

    <Section title="The service">
      <P>
        Flatto is provided as it is. Rent figures and schedules are for your convenience and are not financial or legal
        advice. To the extent the law allows, we are not liable for indirect losses.
      </P>
    </Section>

    <Section title="Ending">
      <P>
        You can delete your account at any time in the app: <strong>Me</strong>, then <strong>Account</strong>, then{" "}
        <strong>Delete Account</strong>. The{" "}
        <Link href="/flatto/privacy-policy#delete-account" sx={{ color: Flatto.tealDeep }}>
          Privacy Policy
        </Link>{" "}
        explains what is deleted and what can remain.
      </P>
    </Section>

    <Section title="Law">
      <P>These terms are governed by the laws of Spain, without affecting your rights as a consumer where you live.</P>
    </Section>

    <Section title="Contact">
      <P>
        <Email />
      </P>
    </Section>
  </FlattoPage>
);

export default FlattoTermsPage;
