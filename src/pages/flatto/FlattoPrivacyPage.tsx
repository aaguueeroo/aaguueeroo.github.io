import { Box, Divider, Link, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Helmet } from "react-helmet-async";
import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";

// Privacy policy of the Flatto app. It wears the app's brand (the Flatto design system) instead of
// the website's: no site navbar or footer. Linked from the App Store and Google Play, so its path
// (/flatto/privacy-policy) and the #delete-account anchor must not change.
//
// Its fonts are served from public/flatto/fonts: a page about privacy doesn't send its readers'
// IP addresses to Google. Every statement comes from the data inventory in the Flatto project
// (04_Legal/privacy-data-inventory.md): change them together.

// The colours and fonts of the design system, from flatto/lib/core/theme/app_colors.dart.
const Flatto = {
  cream: "#FBF6EF",
  white: "#FFFFFF",
  line: "#EDE4D8",
  lineStrong: "#DCCFBF",
  ink: "#173F4A",
  inkSoft: "#4F6B73",
  tangerine: "#EB6F3D",
  tangerineTint: "#FFF3EC",
  tealDeep: "#1C6E68",
  tealTint: "#EDF8F6",
  display: "'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif",
  body: "'Plus Jakarta Sans', system-ui, -apple-system, 'Segoe UI', sans-serif",
} as const;

const flattoTheme = createTheme({
  palette: {
    primary: { main: Flatto.tealDeep },
    text: { primary: Flatto.ink, secondary: Flatto.inkSoft },
    background: { default: Flatto.cream, paper: Flatto.white },
    divider: Flatto.line,
  },
  typography: {
    fontFamily: Flatto.body,
    h1: { fontFamily: Flatto.display, fontWeight: 800 },
    h2: { fontFamily: Flatto.display, fontWeight: 700 },
  },
});

const CONTACT_EMAIL = "flatto@juliaaguero.com";
const LAST_UPDATED = "31 October 2026";

const TITLE = "Flatto Privacy Policy";
const DESCRIPTION =
  "What personal data the Flatto app processes, why, where, for how long, who can see it, and how to delete your account.";
const PAGE_URL = "https://juliaaguero.com/flatto/privacy-policy";
const ICON_URL = "https://juliaaguero.com/flatto/icon.png";

const FONT_FACES = `
@font-face {
  font-family: 'Bricolage Grotesque';
  src: url('/flatto/fonts/bricolage-grotesque.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-display: swap;
}
@font-face {
  font-family: 'Plus Jakarta Sans';
  src: url('/flatto/fonts/plus-jakarta-sans.woff2') format('woff2-variations');
  font-weight: 200 800;
  font-display: swap;
}`;

const SECTIONS = [
  { id: "controller", title: "1. Data controller" },
  { id: "definitions", title: "2. Definitions" },
  { id: "data", title: "3. Data we process" },
  { id: "purposes", title: "4. Purposes and legal bases" },
  { id: "recipients", title: "5. Who can see or receive your data" },
  { id: "transfers", title: "6. International transfers" },
  { id: "retention", title: "7. How long we keep your data" },
  { id: "rights", title: "8. Your rights" },
  { id: "delete-account", title: "9. Delete your account" },
  { id: "device", title: "10. Storage on your device" },
  { id: "security", title: "11. Security" },
  { id: "children", title: "12. Children" },
  { id: "outside-eea", title: "13. Users outside the EEA" },
  { id: "changes", title: "14. Changes to this policy" },
  { id: "contact", title: "15. Contact" },
] as const;

type SectionId = (typeof SECTIONS)[number]["id"];

const External = ({ href, children }: { href: string; children: ReactNode }) => (
  <Link href={href} target="_blank" rel="noopener" sx={{ color: Flatto.tealDeep, overflowWrap: "anywhere" }}>
    {children}
  </Link>
);

const Email = () => (
  <Link href={`mailto:${CONTACT_EMAIL}`} sx={{ color: Flatto.tealDeep, fontWeight: 700, overflowWrap: "anywhere" }}>
    {CONTACT_EMAIL}
  </Link>
);

const See = ({ id, children }: { id: SectionId; children: ReactNode }) => (
  <Link href={`#${id}`} sx={{ color: Flatto.tealDeep }}>
    {children}
  </Link>
);

const Section = ({ id, children }: { id: SectionId; children: ReactNode }) => (
  <Box component="section" id={id} sx={{ scrollMarginTop: "24px" }}>
    <Typography variant="h2" sx={{ fontSize: { xs: "1.5rem", md: "1.75rem" }, lineHeight: 1.25, mb: "16px" }}>
      {SECTIONS.find((section) => section.id === id)?.title}
    </Typography>
    {children}
  </Box>
);

const SubHeading = ({ children }: { children: ReactNode }) => (
  <Typography
    component="h3"
    sx={{ fontSize: "1.125rem", fontWeight: 700, lineHeight: 1.35, color: Flatto.ink, mt: "24px", mb: "8px" }}
  >
    {children}
  </Typography>
);

const P = ({ children }: { children: ReactNode }) => (
  <Typography sx={{ fontSize: "1.0625rem", lineHeight: 1.6, color: Flatto.ink, mb: "16px" }}>{children}</Typography>
);

const List = ({ items, ordered = false }: { items: ReactNode[]; ordered?: boolean }) => (
  <Box
    component={ordered ? "ol" : "ul"}
    sx={{
      m: 0,
      mb: "16px",
      pl: "1.4rem",
      "& li": { fontSize: "1.0625rem", lineHeight: 1.6, color: Flatto.ink, mb: "0.4rem" },
    }}
  >
    {items.map((item, i) => (
      <li key={i}>{item}</li>
    ))}
  </Box>
);

// A real table from 600px up. On a phone each row stacks into a card, with the column name above
// each value, so that nothing scrolls sideways.
const DataTable = ({ columns, rows }: { columns: string[]; rows: ReactNode[][] }) => (
  <Box
    component="table"
    sx={{
      width: "100%",
      borderCollapse: "collapse",
      mb: "16px",
      fontSize: "1rem",
      lineHeight: 1.5,
      color: Flatto.ink,
      "& th": {
        textAlign: "left",
        fontWeight: 700,
        p: "12px",
        borderBottom: `2px solid ${Flatto.lineStrong}`,
        verticalAlign: "bottom",
      },
      "& td": { p: "12px", borderBottom: `1px solid ${Flatto.line}`, verticalAlign: "top", overflowWrap: "anywhere" },
      "@media (max-width: 599.95px)": {
        display: "block",
        "& thead": {
          position: "absolute",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          clipPath: "inset(50%)",
        },
        "& tbody": { display: "block" },
        "& tr": {
          display: "block",
          backgroundColor: Flatto.white,
          border: `1px solid ${Flatto.line}`,
          borderRadius: "16px",
          p: "16px",
          mb: "12px",
        },
        "& td": { display: "block", p: 0, border: "none", mb: "12px" },
        "& td:last-child": { mb: 0 },
        "& td::before": {
          content: "attr(data-label)",
          display: "block",
          fontWeight: 700,
          fontSize: "0.875rem",
          color: Flatto.inkSoft,
        },
      },
    }}
  >
    <thead>
      <tr>
        {columns.map((column) => (
          <th key={column} scope="col">
            {column}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>
      {rows.map((row, r) => (
        <tr key={r}>
          {row.map((cell, c) => (
            <td key={c} data-label={columns[c]}>
              {cell}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  </Box>
);

const KEY_INFORMATION: [string, ReactNode][] = [
  [
    "Controller",
    <>
      Julia Agüero, Spain. Contact: <Email />
    </>,
  ],
  [
    "Purposes",
    "Running your Flatto account and your shared flat, sending account emails, keeping the service secure, and handling your feedback and questions.",
  ],
  [
    "Legal bases",
    "Performance of a contract (art. 6.1.b GDPR). Legitimate interests (art. 6.1.f GDPR) in security, fixing problems, answering you and displaying the app's fonts. Legal obligations and the defence of claims (arts. 6.1.c and 6.1.f GDPR).",
  ],
  [
    "Recipients",
    "The other members of your flat. Our processors, Supabase and Resend. Google and Apple, if you sign in with them. Google also for fonts, profile pictures and our mailbox. We do not sell your data.",
  ],
  [
    "Transfers",
    "App data is stored in Ireland. Some providers can access or receive data outside the European Economic Area, under standard contractual clauses or the EU-US Data Privacy Framework.",
  ],
  [
    "Your rights",
    <>
      Access, rectification, erasure, restriction, portability and objection, at <Email />. You can complain to the
      Spanish Data Protection Agency (AEPD).
    </>,
  ],
  ["More information", "In the numbered sections below."],
];

const FlattoPrivacyPage = () => {
  const { hash } = useLocation();

  // The page is drawn in the browser, after it has looked for the anchor. Google Play links here
  // with #delete-account, so the jump is made once the content exists.
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  return (
    <ThemeProvider theme={flattoTheme}>
      <Helmet htmlAttributes={{ lang: "en" }}>
        <title>{TITLE}</title>
        <meta name="description" content={DESCRIPTION} />
        <link rel="canonical" href={PAGE_URL} />
        <link rel="icon" type="image/png" href="/flatto/icon.png" />
        <link rel="apple-touch-icon" href="/flatto/apple-touch-icon.png" />
        <meta name="theme-color" content={Flatto.cream} />
        <meta property="og:title" content={TITLE} />
        <meta property="og:site_name" content="Flatto" />
        <meta property="og:description" content={DESCRIPTION} />
        <meta property="og:image" content={ICON_URL} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_GB" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={TITLE} />
        <meta name="twitter:description" content={DESCRIPTION} />
        <meta name="twitter:image" content={ICON_URL} />
        <style>{FONT_FACES}</style>
      </Helmet>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: Flatto.cream,
          color: Flatto.ink,
          fontFamily: Flatto.body,
        }}
      >
        <Box
          component="header"
          sx={{
            backgroundColor: Flatto.white,
            borderBottom: `1px solid ${Flatto.line}`,
            px: { xs: "16px", sm: "32px" },
            py: "12px",
          }}
        >
          <Box sx={{ maxWidth: "760px", mx: "auto", display: "flex", alignItems: "center", gap: "8px" }}>
            <Box component="img" src="/flatto/icon.png" alt="" sx={{ width: 48, height: 48 }} />
            <Typography
              component="span"
              sx={{ fontFamily: Flatto.display, fontWeight: 800, fontSize: "1.6rem", color: Flatto.ink }}
            >
              Flatto
            </Typography>
          </Box>
        </Box>
        <Box component="main" sx={{ flex: 1, px: { xs: "16px", sm: "32px" }, pb: "64px" }}>
          <Box
            component="article"
            sx={{
              maxWidth: "760px",
              mx: "auto",
              mt: { xs: "32px", md: "48px" },
              display: "flex",
              flexDirection: "column",
              gap: "32px",
            }}
          >
            <Box>
              <Typography variant="h1" sx={{ fontSize: { xs: "2rem", md: "2.5rem" }, lineHeight: 1.15, mb: "12px" }}>
                Flatto Privacy Policy
              </Typography>
              <Typography sx={{ fontSize: "1rem", color: Flatto.inkSoft, mb: "16px" }}>
                Last updated: {LAST_UPDATED}
              </Typography>
              <P>
                This policy covers the Flatto mobile app for iOS and Android. It explains what personal data the app
                processes, why, where and for how long, who can see it, and the rights you have over it.
              </P>
            </Box>

            <Box
              sx={{
                backgroundColor: Flatto.tangerineTint,
                border: `1px solid ${Flatto.line}`,
                borderRadius: "24px",
                p: { xs: "20px", md: "32px" },
              }}
            >
              <Typography
                component="h2"
                sx={{ fontFamily: Flatto.display, fontWeight: 700, fontSize: "1.375rem", mb: "8px" }}
              >
                In short
              </Typography>
              <List
                items={[
                  "Flatto stores your account and everything in your flat so that you and your flatmates can use the app.",
                  "Your data is stored in Ireland, in the European Union.",
                  "There are no ads, no analytics and no tracking. Your data is not sold.",
                  "What you add to a flat is visible to everyone in that flat.",
                  "Photos are kept in private storage and can only be opened by people signed in to Flatto. Section 5.2 has the details.",
                  <>
                    You can delete your account in the app: <strong>Me</strong>, then <strong>Account</strong>, then{" "}
                    <strong>Delete Account</strong>.
                  </>,
                ]}
              />
            </Box>

            <Box
              sx={{
                backgroundColor: Flatto.tealTint,
                border: `1px solid ${Flatto.line}`,
                borderRadius: "24px",
                p: { xs: "20px", md: "32px" },
              }}
            >
              <Typography
                component="h2"
                sx={{ fontFamily: Flatto.display, fontWeight: 700, fontSize: "1.375rem", mb: "12px" }}
              >
                Key information
              </Typography>
              <Box component="dl" sx={{ m: 0 }}>
                {KEY_INFORMATION.map(([label, value]) => (
                  <Box key={label} sx={{ mb: "12px", "&:last-of-type": { mb: 0 } }}>
                    <Typography component="dt" sx={{ fontWeight: 700, fontSize: "1rem" }}>
                      {label}
                    </Typography>
                    <Typography component="dd" sx={{ m: 0, fontSize: "1.0625rem", lineHeight: 1.55 }}>
                      {value}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>

            <Box component="nav" aria-label="Contents">
              <Typography
                component="h2"
                sx={{ fontFamily: Flatto.display, fontWeight: 700, fontSize: "1.375rem", mb: "8px" }}
              >
                Contents
              </Typography>
              <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0 }}>
                {SECTIONS.map((section) => (
                  <Box component="li" key={section.id} sx={{ fontSize: "1.0625rem", lineHeight: 1.8 }}>
                    <See id={section.id}>{section.title}</See>
                  </Box>
                ))}
              </Box>
            </Box>

            <Section id="controller">
              <P>
                The data controller, the person who decides why and how your personal data is processed, is Julia
                Agüero, the developer of Flatto, based in Spain. In this policy, "we" and "us" mean her. For anything
                about this policy or your data, write to <Email />.
              </P>
              <P>
                No data protection officer has been appointed, because the law does not require one for a service like
                this (art. 37 GDPR and art. 34 of Spanish Organic Law 3/2018, the LOPDGDD).
              </P>
            </Section>

            <Section id="definitions">
              <List
                items={[
                  <>
                    <strong>Personal data:</strong> any information about a person who can be identified.
                  </>,
                  <>
                    <strong>Processing:</strong> anything done with personal data, such as storing, showing or deleting
                    it.
                  </>,
                  <>
                    <strong>Processor:</strong> a company that handles data on our behalf, following our instructions.
                  </>,
                  <>
                    <strong>Legal basis:</strong> the reason the law recognises for processing data.
                  </>,
                  <>
                    <strong>Flat:</strong> the shared home you create or join in Flatto. Some screens call it an
                    apartment.
                  </>,
                  <>
                    <strong>Owner and members:</strong> the owner is the person who created the flat or received it from
                    the previous owner. Members are everyone in the flat, including the owner.
                  </>,
                ]}
              />
            </Section>

            <Section id="data">
              <SubHeading>3.1 Your account</SubHeading>
              <P>
                Your email address, your name, and your password, which is stored only as a hash: a scrambled value that
                cannot be turned back into the password. We also keep your account ID and the dates your account was
                created, updated, confirmed and last used. You can add a profile photo.
              </P>
              <P>
                If you choose <strong>Sign in with Google</strong>, Google gives us your email address, your name and the
                address of your Google profile picture. If you choose <strong>Sign in with Apple</strong>, available on
                iPhone and iPad, Apple gives us your name, the first time only, and your email address, or a private relay
                address if you choose to hide it. In both cases we also keep an identifier for that sign-in account. We
                never receive your Google or Apple password.
              </P>

              <SubHeading>3.2 Your flat</SubHeading>
              <P>
                The flat's name, address, rent and expenses, and its invite code. Who the members are, their role and
                when they joined. Each room's name, price, size and notes, and who is assigned to it. Requests to join:
                who asked, when, the answer and who gave it.
              </P>

              <SubHeading>3.3 What you and your flatmates add</SubHeading>
              <P>
                Messages in the flat's feed. Shopping items, with who added and bought them. Chores, their frequency and
                estimated time, who each one is assigned to, and who completed it and when. Photos of the flat and its
                rooms, with who uploaded them.
              </P>
              <P>
                Flatto also posts automatic messages in the feed, and these include people's names. For example: "Ana
                completed the chore: Bins", "Ana has left the apartment" or "Ana did not clean the apartment for the week
                of…".
              </P>

              <SubHeading>3.4 Photos</SubHeading>
              <P>
                Flatto uses your camera or photo library only when you choose to add a photo. Profile, flat and room
                photos are resized and converted before upload, and the app does not keep embedded details such as where
                they were taken. Screenshots sent with feedback are uploaded as you picked them, so they can keep those
                details.
              </P>

              <SubHeading>3.5 Feedback</SubHeading>
              <P>
                If you use <strong>Send feedback</strong>, we receive the type of report, your text and any screenshots.
                The report is linked to your account, and only you and we can see it. When you delete your account that
                link is removed, but a screenshot's file address still contains your account ID.
              </P>

              <SubHeading>3.6 Technical data</SubHeading>
              <P>
                Like any online service, our servers record technical data about connections: your IP address, the type
                of device or browser, the date and time, and the type of request. The sign-in system also keeps a
                security log of account events, such as sign-ups and sign-ins, with your email address and the time.
              </P>

              <SubHeading>3.7 If you write to us</SubHeading>
              <P>Your email address, your name if it appears, and whatever your message says.</P>

              <SubHeading>3.8 What Flatto does not collect</SubHeading>
              <P>
                Flatto does not use your location, your contacts or any advertising identifier. It contains no analytics,
                advertising or crash-reporting tools. It takes no payments: rent and expenses are figures people type in.
              </P>

              <SubHeading>3.9 What is required</SubHeading>
              <P>
                To create an account you need an email address, a name and a password, or a Google or Apple account.
                Without them we cannot create your account. No law requires you to give us any of this data. Everything else is
                optional, although the shared features only work once you are in a flat.
              </P>

              <SubHeading>3.10 Data about other people</SubHeading>
              <P>
                Some data about you comes from others: an owner can assign you to a room, a flatmate can mention you in a
                message or appear with you in a photo. We process that data for the same purposes, and you have the same
                rights over it (art. 14 GDPR).
              </P>
              <P>
                If you add details about someone else, make sure you are allowed to and that they know. Please don't add
                sensitive information, such as health details or identity documents, to notes, messages or photos.
              </P>
            </Section>

            <Section id="purposes">
              <P>Each purpose has its own legal basis:</P>
              <DataTable
                columns={["Purpose", "Data", "Legal basis", "Detail"]}
                rows={[
                  [
                    "Create and run your account, sign you in and keep you signed in",
                    "Account and technical data",
                    "Contract (art. 6.1.b GDPR)",
                    "Needed to give you the service you asked for.",
                  ],
                  [
                    "Run your flat: share content with members, rotate chores and post automatic messages",
                    "Flat data, content and photos",
                    "Contract (art. 6.1.b GDPR)",
                    "This is what the app does.",
                  ],
                  [
                    "Sign you in with Google or Apple",
                    "Email, name, sign-in identifier and, for Google, the picture address",
                    "Contract (art. 6.1.b GDPR)",
                    "Only if you choose it. You can use an email and password instead.",
                  ],
                  [
                    "Send account emails: confirming your address and changing it",
                    "Email address",
                    "Contract (art. 6.1.b GDPR)",
                    "No marketing emails are sent.",
                  ],
                  [
                    "Keep the service secure and prevent abuse",
                    "Technical data and security log",
                    "Legitimate interest (art. 6.1.f GDPR)",
                    "Our interest is protecting the service and accounts against unauthorised access (recital 49 GDPR). We have weighed this against your rights: the processing is limited and expected, and it does not significantly affect you.",
                  ],
                  [
                    "Display the app's fonts",
                    "IP address and request details sent to Google",
                    "Legitimate interest (art. 6.1.f GDPR)",
                    "Our interest is showing the app with its intended design. No account data is sent, and fonts are kept on your device after the first download.",
                  ],
                  [
                    "Fix problems and improve the app",
                    "Feedback and screenshots",
                    "Legitimate interest (art. 6.1.f GDPR)",
                    "Our interest is correcting faults and improving Flatto. It only happens when you choose to send feedback.",
                  ],
                  [
                    "Answer you when you write to us",
                    "Your email and message",
                    "Legitimate interest (art. 6.1.f GDPR), or contract if it is about your account",
                    "Our interest is answering you.",
                  ],
                  [
                    "Meet legal duties and establish or defend legal claims",
                    "The data needed in each case",
                    "Legal obligation (art. 6.1.c GDPR) and legitimate interest (art. 6.1.f GDPR)",
                    "Our interest is being able to defend ourselves. See section 7.",
                  ],
                ]}
              />
              <P>
                We do not rely on consent as a legal basis, so there is no consent to withdraw. Camera and photo access
                are device permissions, and you can change them at any time in your phone's settings.
              </P>
              <P>
                We do not send marketing or build profiles of you. We take no automated decisions with legal or similarly
                significant effects on you (art. 22 GDPR). The app calculates the chore rota automatically, but that only
                rotates household chores among the members of a flat.
              </P>
            </Section>

            <Section id="recipients">
              <SubHeading>5.1 People in your flat</SubHeading>
              <DataTable
                columns={["Who", "What they can see or do"]}
                rows={[
                  [
                    "Members of your flat",
                    "Your name, profile photo, role and join date. Your room and its price, size and notes. The flat's name, address, rent, expenses and invite code. Everything in the feed, the shopping list and the chores, including who added, bought or completed what. Flat and room photos and who uploaded them. They can also read your email address: the app's usual screens don't show it, but the database rules allow it.",
                  ],
                  [
                    "The owner of your flat",
                    "All of the above. The owner can also edit the flat, its rooms and chores, assign rooms, accept or reject join requests, remove members and delete flat photos.",
                  ],
                  [
                    "Someone who asks to join",
                    "Asking needs the flat's invite code. From that moment, before anyone approves them, they can see the flat's name, address and invite code, and the database rules also let them read its rent and expenses.",
                  ],
                  [
                    "A flat you ask to join",
                    "Its members can see your name and email address while your request is pending.",
                  ],
                ]}
              />
              <P>
                Invite codes do not expire, so share yours only with people you want in your flat. If you leave a flat,
                what you added stays there.
              </P>

              <SubHeading>5.2 Photos</SubHeading>
              <P>
                Profile, flat, room and feedback photos are kept in private storage. The app loads them with your signed-in
                session, so someone who isn't signed in to Flatto can't open them.
              </P>
              <P>
                In the app, only the people described above see them. The storage rules are wider than that: any signed-in
                user who belongs to a flat can open a flat or room photo if they have its exact file address, and any
                signed-in user can open a profile photo the same way. These addresses are long and contain the uploader's
                account ID and a timestamp, and we don't publish or list them. Even so, avoid photos that show documents or
                anything sensitive.
              </P>
              <P>Feedback screenshots can only be opened by you and by us.</P>

              <SubHeading>5.3 Our processors</SubHeading>
              <P>These companies handle data on our behalf, under a data processing agreement (art. 28 GDPR):</P>
              <DataTable
                columns={["Provider", "What it does", "Where", "Safeguard"]}
                rows={[
                  [
                    "Supabase (Supabase Pte. Ltd., Singapore, and Supabase, Inc., United States)",
                    "Database, accounts and sign-in, photo storage and live updates. Handles all app data and technical data. Its sub-processors include Amazon Web Services for hosting and Cloudflare for content delivery.",
                    "Data stored in Ireland (AWS eu-west-1). Staff and sub-processors can access it from outside the EEA.",
                    "Standard contractual clauses",
                  ],
                  [
                    "Resend (Plus Five Five, Inc., United States)",
                    "Sends account emails and receives messages sent to our contact address.",
                    "Email handled in Ireland. The company is in the United States.",
                    "Standard contractual clauses and the EU-US Data Privacy Framework",
                  ],
                ]}
              />

              <SubHeading>5.4 Google and Apple</SubHeading>
              <P>
                These companies are not our processors in the cases below. They handle this data under their own privacy
                policies: Google (Google Ireland Limited in the EEA, with Google LLC in the United States) under{" "}
                <External href="https://policies.google.com/privacy">its privacy policy</External>, and Apple (Apple
                Distribution International Limited in the EEA, with Apple Inc. in the United States) under{" "}
                <External href="https://www.apple.com/legal/privacy/">its privacy policy</External>.
              </P>
              <List
                items={[
                  <>
                    <strong>Sign in with Google:</strong> only if you use it. Google runs the sign-in and knows you used
                    it for Flatto.
                  </>,
                  <>
                    <strong>Sign in with Apple:</strong> only if you use it. Apple runs the sign-in and knows you used it
                    for Flatto.
                  </>,
                  <>
                    <strong>Google Fonts:</strong> the app downloads its fonts from Google's servers the first time it
                    needs them. Google receives your IP address and the details of that request, with no account data.
                  </>,
                  <>
                    <strong>Google profile pictures:</strong> if your profile uses your Google picture, it loads from
                    Google's servers on your phone and your flatmates' phones, so Google receives their IP addresses.
                  </>,
                  <>
                    <strong>Gmail:</strong> messages sent to our contact address are forwarded to a Gmail mailbox, where
                    we read and answer them.
                  </>,
                ]}
              />

              <SubHeading>5.5 Anyone else</SubHeading>
              <P>
                We do not sell your data or give it to anyone for their own purposes. We would only disclose it to an
                authority when the law requires it.
              </P>
              <P>
                Apple and Google handle your download of the app under their own policies. This web page is hosted on
                GitHub Pages, which receives your IP address when you open it. The page itself uses no cookies or
                analytics.
              </P>
            </Section>

            <Section id="transfers">
              <P>
                Flatto's database, accounts and photos are stored in the European Union, in Ireland. An international
                transfer happens when personal data is sent to, or accessed from, a country outside the European Economic
                Area (EEA). These transfers can happen:
              </P>
              <List
                items={[
                  <>
                    <strong>Supabase:</strong> its staff and sub-processors in the United States, Singapore and other
                    countries can access data to run and support the service. The safeguard is the standard contractual
                    clauses approved by the European Commission (art. 46.2.c GDPR), included in Supabase's data processing
                    agreement.
                  </>,
                  <>
                    <strong>Resend:</strong> a United States company. The safeguards are the standard contractual clauses
                    in its data processing agreement and its certification under the EU-US Data Privacy Framework (art. 45
                    GDPR).
                  </>,
                  <>
                    <strong>Google:</strong> Google LLC participates in the EU-US Data Privacy Framework, covered by the
                    European Commission's adequacy decision of 10 July 2023 (art. 45 GDPR).
                  </>,
                ]}
              />
              <P>
                Apple handles Sign in with Apple under its own policy, as section 5.4 explains. To get a copy of the
                safeguards above, write to <Email />.
              </P>
            </Section>

            <Section id="retention">
              <DataTable
                columns={["Data", "How long"]}
                rows={[
                  ["Account data", "While your account exists. See section 9 for what happens when you delete it."],
                  ["Flat data, rooms and the invite code", "While the flat exists, until its owner deletes it."],
                  [
                    "Feed messages",
                    "Until their author deletes them or the flat is deleted. Automatic messages last as long as the flat.",
                  ],
                  [
                    "Shopping items and chores",
                    "Until they are removed, the flat is deleted, or the account that added or was assigned them is deleted.",
                  ],
                  ["Join requests", "Until the flat or the account that made the request is deleted."],
                  ["Photos", "Until they are deleted, or the account that uploaded them is deleted."],
                  [
                    "Feedback and screenshots",
                    "Until the problem is resolved or the suggestion reviewed. You can ask us to delete them earlier.",
                  ],
                  ["Technical data in server logs", "The limited period set by our hosting provider for its logs."],
                  [
                    "Security log of account events",
                    "As long as it is useful for security. It is not removed automatically when you delete your account, but you can ask us to erase your entries.",
                  ],
                  [
                    "Messages to our contact address",
                    "The time needed to answer you, then during the limitation periods of any related claims.",
                  ],
                  ["Backups", "Deleted data can remain in backups until they are overwritten."],
                ]}
              />
              <P>
                When data is erased, we may keep some of it blocked if we need it to meet legal liabilities, only for
                their limitation periods and with access restricted (art. 32 LOPDGDD). After that, it is destroyed.
              </P>
            </Section>

            <Section id="rights">
              <P>You have the right to:</P>
              <List
                items={[
                  <>
                    <strong>Access</strong> your data and get a copy (art. 15 GDPR).
                  </>,
                  <>
                    <strong>Rectify</strong> data that is wrong or incomplete (art. 16).
                  </>,
                  <>
                    <strong>Erase</strong> your data (art. 17).
                  </>,
                  <>
                    <strong>Restrict</strong> how we process it in certain cases (art. 18).
                  </>,
                  <>
                    <strong>Portability:</strong> receive the data you gave us in a machine-readable format (art. 20).
                  </>,
                  <>
                    <strong>Object</strong> to processing based on legitimate interest (art. 21).
                  </>,
                ]}
              />
              <P>
                In the app you can change your name, photo, email and password, delete your messages, shopping items and
                photos, leave a flat, and delete your account. For everything else, write to <Email /> from the address of
                your account. If we can't confirm it's you, we may ask for more information.
              </P>
              <P>
                We answer within one month. For complex requests we can take two more months, and we'll tell you if so.
                It's free, unless a request is manifestly unfounded or excessive (art. 12 GDPR).
              </P>
              <P>
                If you think we have not handled your data properly, you can complain to the Spanish Data Protection
                Agency (Agencia Española de Protección de Datos, C/ Jorge Juan 6, 28001 Madrid,{" "}
                <External href="https://www.aepd.es">www.aepd.es</External>).
              </P>
              <P>
                The heirs of a person who has died can ask for access to, rectification of or erasure of that person's
                data (art. 3 LOPDGDD).
              </P>
            </Section>

            <Section id="delete-account">
              <SubHeading>9.1 In the app</SubHeading>
              <List
                ordered
                items={[
                  <>
                    Open the <strong>Me</strong> tab.
                  </>,
                  <>
                    Tap <strong>Account</strong>.
                  </>,
                  <>
                    Scroll down and tap <strong>Delete Account</strong>.
                  </>,
                  <>
                    Confirm with <strong>Delete Account</strong>.
                  </>,
                ]}
              />
              <P>
                If you are the owner of a flat and the only member, the app warns you that the flat will be deleted too,
                and asks you to confirm again. If you own a flat that has other members, transfer ownership to one of them
                first, or ask them to leave.
              </P>
              <P>Uninstalling the app does not delete your account.</P>

              <SubHeading>9.2 Without the app</SubHeading>
              <P>
                Write to <Email /> from the address of your account and ask us to delete it. Do the same if the app shows
                an error when you try. We'll delete your account within 30 days and confirm when it's done.
              </P>

              <SubHeading>9.3 What is deleted</SubHeading>
              <List
                items={[
                  "Your account, your sign-in details and any link to your Google or Apple account.",
                  "Your profile and your current profile photo.",
                  "The flat and room photos you uploaded.",
                  "The shopping items you added.",
                  "The chores assigned to you, and your place in the rota.",
                  "Your join requests, your memberships and your room assignments.",
                  "Any flat where you were the owner and the only member, with everything in it.",
                ]}
              />
              <P>
                This doesn't change your Google or Apple account. To remove Flatto from the apps connected to that account,
                use its security settings.
              </P>

              <SubHeading>9.4 What can remain</SubHeading>
              <List
                items={[
                  "Messages you wrote in a flat that still has other members. They lose the link to your account, but the text stays. You can delete them yourself first.",
                  "Automatic feed messages that name you, and your name as the buyer of shopping items that someone else added. These stay in the flat as part of its history.",
                  "What your flatmates wrote about you.",
                  "Feedback you sent, including any screenshots. The link to your account is removed, but a screenshot's file address still contains your account ID.",
                  "Your entries in the security log of account events.",
                  "Photo files the app no longer uses, such as earlier profile photos or room photos from a deleted flat. The app doesn't show them, but they stay in storage.",
                  "Copies in backups, until they are overwritten.",
                  "Data blocked for legal reasons, as described in section 7.",
                ]}
              />
              <P>
                To have any of this erased, write to <Email />.
              </P>
            </Section>

            <Section id="device">
              <P>To work, the app stores the following on your phone:</P>
              <List
                items={[
                  "Your session, so you don't have to sign in every time. This includes your sign-in tokens and basic account details. It is removed when you log out.",
                  "A note that the app has already been opened once, for the first-launch screen.",
                  "The fonts it downloads.",
                  "If you use Google sign-in, the sign-in details kept by Google's software.",
                  "Temporary copies of photos while you upload them.",
                ]}
              />
              <P>
                All of this is strictly necessary for the service you asked for, so it doesn't need consent (art. 22.2 of
                the Spanish LSSI and art. 5.3 of Directive 2002/58/EC). Flatto stores nothing on your phone for advertising
                or analytics.
              </P>
              <P>
                Uninstalling the app removes this data, except that Google's sign-in details can stay in an iPhone's
                keychain. Your phone's own backups (iCloud or Google) can include the app's storage.
              </P>
            </Section>

            <Section id="security">
              <P>
                Connections between the app and our servers are encrypted. Passwords are stored only as hashes. The app
                asks you to confirm your email address before you use your account. Database rules limit each person to
                the data of their own flat, according to their role.
              </P>
              <P>
                No system is completely secure, and we can't guarantee absolute security. Section 5.2 explains the limits
                of the rules that protect photos.
              </P>
              <P>
                If a personal data breach puts you at risk, we'll tell the AEPD and, where the law requires, tell you
                directly (arts. 33 and 34 GDPR).
              </P>
            </Section>

            <Section id="children">
              <P>
                Flatto has no minimum age and does not ask for your age or date of birth. It is made for people who share a
                home and is not directed at children.
              </P>
              <P>
                Under Spanish law, a person under 14 cannot consent to the processing of their data alone: a parent or
                guardian has to do it for them (art. 7 LOPDGDD). If you are under 14, use Flatto only with the agreement of
                a parent or guardian.
              </P>
              <P>
                Parents and guardians can write to <Email /> to see or delete the data of a child in their care.
              </P>
            </Section>

            <Section id="outside-eea">
              <P>
                <strong>United Kingdom.</strong> You have the same rights under the UK GDPR, and you can complain to the
                Information Commissioner's Office (<External href="https://ico.org.uk">ico.org.uk</External>).
              </P>
              <P>
                <strong>California and other US states.</strong> We do not sell or share your personal information. Section
                3 lists what we collect and section 5 who receives it. Flatto does not track you across apps or websites, so
                it does not respond to Do Not Track signals.
              </P>
            </Section>

            <Section id="changes">
              <P>
                If this policy changes, the new version will be published here with its date. If the change is important,
                we'll also tell you by email or in the app before it takes effect. You can ask for earlier versions at{" "}
                <Email />.
              </P>
            </Section>

            <Section id="contact">
              <P>
                For anything about this policy or your data, write to <Email />. The supervisory authority is the Spanish
                Data Protection Agency: <External href="https://www.aepd.es">www.aepd.es</External>.
              </P>
            </Section>

            <Divider />
            <P>
              Questions? Write to <Email />.
            </P>
          </Box>
        </Box>
        <Box
          component="footer"
          sx={{ borderTop: `1px solid ${Flatto.line}`, px: { xs: "16px", sm: "32px" }, py: "24px" }}
        >
          <Typography sx={{ maxWidth: "760px", mx: "auto", color: Flatto.inkSoft, fontSize: "1rem" }}>
            Flatto · An app for shared flats.
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default FlattoPrivacyPage;
