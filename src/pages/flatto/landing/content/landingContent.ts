import { LandingContent } from "./types";

// Every word on the page, and nothing else: no markup, no styles. The reasoning and the check of
// each claim against the app are in the Flatto project, 03_Marketing/copy-flatto-landing.md.
// Change them together.

const JOIN_ID = "join";
const TESTER_EMAIL = "flatto@juliaaguero.com";
const PAGE_URL = "https://juliaaguero.com/flatto/";

const joinCta = { label: "Join the testers", href: `#${JOIN_ID}` };

export const landingContent: LandingContent = {
  meta: {
    title: "Flatto · The app for sharing a flat",
    description:
      "Whose turn is it? What's missing? Who's letting the plumber in? Flatto puts chores, shopping and the flat chat in one app. Join the testers.",
    shareTitle: "Nobody wants to be the flatmate who nags",
    shareDescription:
      "Flatto keeps track of the chores, the shopping and the flat chat, so nobody has to ask. Join the testers.",
    shareImage: "https://juliaaguero.com/flatto/images/flatto-share-v1.jpg",
    shareImageAlt:
      "Flatto: nobody wants to be the flatmate who nags. A phone shows the app's flat chat and next chore.",
    url: PAGE_URL,
  },
  skipLink: "Skip to the content",
  header: {
    brand: "Flatto",
    home: "Flatto, top of the page",
    navLabel: "Main",
    nav: [
      { label: "How it works", href: "#how-it-works" },
      { label: "Questions", href: "#questions" },
    ],
    cta: joinCta,
  },
  hero: {
    pill: "Looking for the first flats to test it",
    title: "Nobody wants to be",
    titleAccent: "the flatmate who nags.",
    lead: "Flatto keeps the chores, the shopping and the flat chat in one app. Everyone can see whose turn it is, so nobody has to ask.",
    cta: joinCta,
    helper: "Free while it's in testing. iPhone and Android.",
    caption: "Real app, demo flat.",
    screen: {
      name: "home",
      alt: "Flatto's Home tab for a demo flat. The next chore is the kitchen, due today, and there are five things to buy. Below, the flat chat shows finished chores, a heads-up about the plumber and a plan for pizza night.",
    },
    glances: {
      chore: { label: "Next chore", title: "Kitchen", detail: "Due today" },
      shopping: { label: "Shopping", title: "5 to buy", detail: "Mozzarella, Pasta…" },
    },
  },
  fridge: {
    eyebrow: "Sound familiar?",
    title: "Your flat already has a system. It's stuck to the fridge.",
    body: "That, a group chat nobody can scroll back through, and one person keeping it all in their head. It works until that person gets tired of it.",
    notes: [
      { text: "Who finished the oat milk? (Not angry. Just asking.)", tone: "sun" },
      { text: "BINS. Tuesday. Again.", tone: "tangerine" },
      { text: "We own four olive oils and no toilet paper.", tone: "teal" },
      { text: "I did the bathroom last time. And the time before.", tone: "tangerine" },
      { text: "Plumber Thursday at 10. Can someone be in?", tone: "teal" },
      { text: "Whose pan is this? It's been a week.", tone: "sun" },
    ],
    statement: "The fight is never really about the bins.",
    statementAccent: "It's about who has to keep asking.",
  },
  meet: {
    id: "how-it-works",
    eyebrow: "Meet Flatto",
    title: "The flatmate who keeps track, so nobody else has to.",
    lead: "One app for the whole flat. Everyone sees the same chores, the same list and the same messages.",
  },
  features: {
    link: { label: "Try it in your flat", href: `#${JOIN_ID}` },
    items: [
      {
        id: "chores",
        icon: "chores",
        tone: "teal",
        label: "Chores",
        title: "Whose turn is it? Flatto knows.",
        body: "Add your chores once, with how often they come round and how long they take. Flatto builds the rota and keeps it turning.",
        points: [
          {
            title: "Fair by time, not by count.",
            text: "A 40-minute kitchen counts for more than a 10-minute bin run.",
          },
          {
            title: "No double shifts.",
            text: "It tries not to give one person two big jobs on the same day.",
          },
          {
            title: "Moves handled.",
            text: "Someone moves in or out and the rota rebalances itself.",
          },
        ],
        visual: {
          kind: "chores",
          screen: {
            name: "rota",
            alt: "Flatto's rota for a demo flat: a monthly calendar of chores, then each chore with how often it comes round and how long it takes, such as the kitchen, weekly, about 40 minutes.",
          },
          demo: {
            prompt: "Go on, it's your turn.",
            label: "Your turn",
            chore: "Kitchen",
            due: "Due today · ~40 min",
            tasks: "Counters, hob, sink and floor",
            action: "Mark as done",
            undo: "Undo",
            weekLabel: "This week",
            weekPending: "4/5 done",
            weekDone: "5/5 done",
            result: "Sofía Ruiz completed the chore: Kitchen",
            payoff: "Everyone can see it. Nobody had to ask.",
          },
        },
      },
      {
        id: "shopping",
        icon: "shopping",
        tone: "tangerine",
        label: "Shopping",
        title: "Stop buying a fifth olive oil.",
        body: "One list on everyone's phone. Run out of something, add it. At the shop, open the list and tick things off as they go in the basket.",
        points: [
          {
            title: "Live for everyone.",
            text: "Changes reach every phone straight away, so two people don't buy the same thing.",
          },
          {
            title: "Buy again.",
            text: "Your usual things are one tap away.",
          },
          {
            title: "Who added what.",
            text: 'So you know who to ask about "the good sponges".',
          },
        ],
        visual: {
          kind: "shopping",
          screen: {
            name: "shopping",
            alt: "Flatto's shopping list for a demo flat: buy-again shortcuts, then five things to buy, each showing who added it and when.",
          },
        },
      },
      {
        id: "chat",
        icon: "chat",
        tone: "sun",
        label: "Flat chat",
        title: "A chat that's only about the flat.",
        body: "Keep your group chat for the memes. This one is for the plumber, Saturday's party and the noise the boiler is making again.",
        points: [
          {
            title: "Heads-ups stand out.",
            text: "Important messages don't get lost in the chatter.",
          },
          {
            title: "Chores post themselves.",
            text: "Nobody has to announce they took the bins out.",
          },
          {
            title: "Issues get flagged.",
            text: "Something broken gets its own kind of message.",
          },
        ],
        visual: {
          kind: "chat",
          entries: [
            { kind: "event", text: "Daniel Brooks completed the chore: Bathroom", time: "08:20" },
            {
              kind: "message",
              author: "Mei Chen",
              initials: "MC",
              tone: "teal",
              tag: "Heads-up",
              text: "The plumber comes Thursday at 10:00 to fix the shower.",
              time: "08:40",
            },
            {
              kind: "event",
              text: "Mei Chen completed the chore: Bins & recycling",
              time: "09:02",
            },
            {
              kind: "message",
              author: "Daniel Brooks",
              initials: "DB",
              tone: "sky",
              text: "Pizza night tonight? I'll bring the dough.",
              time: "09:15",
            },
            { kind: "own", text: "Rent for November is in. Thanks both!", time: "09:28" },
          ],
        },
      },
      {
        id: "flat",
        icon: "flat",
        tone: "mint",
        label: "Your flat",
        title: "Everything you'd otherwise ask twice.",
        body: "Rent, bills, rooms, who lives where and photos of the place, all in one spot. The new flatmate doesn't need a 40-message briefing.",
        points: [
          {
            title: "The same numbers for everyone.",
            text: "Rent and bills, written down where anyone can check.",
          },
          {
            title: "Every room on file.",
            text: "Price, size, notes and a photo.",
          },
          {
            title: "One code to get in.",
            text: "Share it, approve the request, done.",
          },
        ],
        visual: {
          kind: "flat",
          screen: {
            name: "rooms",
            alt: "Flatto's Flat tab for a demo flat: three rooms with a photo, monthly price, size, notes and who lives there.",
          },
          cost: {
            label: "Monthly cost",
            total: "€1860",
            lines: [
              { label: "Rent", value: "€1650" },
              { label: "Bills", value: "€210" },
            ],
          },
        },
      },
    ],
  },
  steps: {
    eyebrow: "Getting started",
    title: "One person sets it up. Everyone else just joins.",
    items: [
      {
        title: "Create your flat",
        text: "Give it a name and add the rooms. You only do this once.",
        card: { label: "Your flat", value: "Lindenstraße 14" },
      },
      {
        title: "Share the code",
        text: "Flatmates join with a six-character code and you let them in.",
        card: { label: "Invite code", value: "b47e2a" },
      },
      {
        title: "Add your chores",
        text: "Say how often and how long. The rota is ready.",
        card: { label: "Kitchen", value: "Weekly · ~40 min" },
      },
    ],
  },
  maker: {
    eyebrow: "Who's behind this",
    title: "A note from the fridge",
    paragraphs: [
      "Hi, I'm Julia. I've lived in shared flats for over ten years. Whose turn is it to clean? Did anyone take the bins out? What do we need to buy? The questions never change, and they always end in a long WhatsApp thread.",
      "If something's repetitive, there's an app for it. So I'm building the one I wanted in all of those flats. As a tester you'll be writing to me, not a support queue, and what you tell me shapes what comes next.",
    ],
    signature: "Julia",
    role: "Building Flatto",
    photoAlt: "Julia Agüero",
  },
  questions: {
    id: "questions",
    eyebrow: "Before you ask",
    title: "Fair questions.",
    items: [
      {
        question: "Is Flatto out yet?",
        answer: [
          "Not yet. It isn't on the App Store or Google Play. I'm inviting a first group of flats to test it, and you'll get the steps to install it by email.",
        ],
      },
      {
        question: "What does it cost?",
        answer: ["Testing is free, and there are no payments in the app."],
      },
      {
        question: "Does everyone in my flat need it?",
        answer: [
          "Ideally, yes. The rota can only share chores between people who are on it. One person sets up the flat and the others join with a code when they're ready.",
        ],
      },
      {
        question: "What would I have to do as a tester?",
        answer: [
          "Use Flatto in your flat and tell me what works and what doesn't. A short message is plenty.",
        ],
      },
      {
        question: "Will it send me reminders?",
        answer: [
          "Not yet. There are no push notifications right now, so you'll see your turn when you open the app. If you'd want them, tell me. That's what testing is for.",
        ],
      },
      {
        question: "Does it split bills?",
        answer: [
          "No. Flatto shows your rent and bills so everyone sees the same numbers, but it doesn't work out who owes what or move any money.",
        ],
      },
      {
        question: "What happens when someone moves out?",
        answer: [
          "They leave the flat in the app and the rota rebalances between whoever's left. The next flatmate joins with the same code.",
        ],
      },
      {
        question: "What happens to my data?",
        answer: [
          "Flatto has no ads, no analytics and no trackers, and neither does this page. You can delete your account from inside the app. The ",
          { label: "privacy policy", href: "/flatto/privacy-policy" },
          " has the details.",
        ],
      },
    ],
  },
  join: {
    id: JOIN_ID,
    eyebrow: "Join the testers",
    titleBefore: "Less",
    titleMuted: "whose turn is it?",
    titleAfter: "More",
    titleBright: "pizza tonight?",
    lead: "I'm looking for flats to try Flatto first. It's free while it's in testing, and your feedback shapes what gets built next.",
    question: "Which phone are you on?",
    phones: [
      {
        platform: "iphone",
        label: "Join on iPhone",
        subject: "Flatto tester: iPhone",
        body: "Hi Julia,\n\nI share a flat and I'd like to test Flatto. I'm on iPhone.\n\nThanks!",
      },
      {
        platform: "android",
        label: "Join on Android",
        subject: "Flatto tester: Android",
        body: "Hi Julia,\n\nI share a flat and I'd like to test Flatto. I'm on Android.\n\nThanks!",
      },
    ],
    helper:
      "Your email app opens with a message ready. Press send and you're on the list. I'll reply with the next steps.",
    fallback: "Email app didn't open? Write to",
    copyLabel: "Copy address",
    copiedLabel: "Copied",
    gmailLabel: "Open in Gmail",
    gmailSubject: "Flatto tester",
    gmailBody:
      "Hi Julia,\n\nI share a flat and I'd like to test Flatto.\n\nMy phone (iPhone or Android): \n\nThanks!",
    email: TESTER_EMAIL,
    sharePrompt: "Not the organised one? Send this to the flatmate who is.",
    shareLabel: "Send to my flat",
    shareMessage: `Found an app for our flat: chores, shopping and a flat chat in one place. They're looking for testers. ${PAGE_URL}`,
  },
  footer: {
    tagline: "The flatmate who keeps track.",
    links: [
      { label: "Privacy policy", href: "/flatto/privacy-policy" },
      { label: "Terms", href: "/flatto/terms" },
      { label: "Support", href: "/flatto/support" },
    ],
    credit: { label: "Made by Julia Agüero", href: "https://juliaaguero.com" },
    note: "App screens show a demo flat with made-up flatmates.",
  },
  stickyCta: joinCta,
};
