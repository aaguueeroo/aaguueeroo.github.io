export interface Link {
  label: string;
  href: string;
}

export interface Point {
  title: string;
  text: string;
}

export type InlineText = ReadonlyArray<string | Link>;

export type ScreenName = "home" | "rota" | "shopping" | "rooms";

export interface Screen {
  name: ScreenName;
  alt: string;
}

export interface Glance {
  label: string;
  title: string;
  detail: string;
}

export interface Note {
  text: string;
  tone: "sun" | "tangerine" | "teal";
}

export interface ChoreDemo {
  prompt: string;
  label: string;
  chore: string;
  due: string;
  tasks: string;
  action: string;
  undo: string;
  weekLabel: string;
  weekPending: string;
  weekDone: string;
  result: string;
  payoff: string;
}

export interface FlatCost {
  label: string;
  total: string;
  lines: ReadonlyArray<{ label: string; value: string }>;
}

export type ChatEntry =
  | { kind: "event"; text: string; time: string }
  | {
      kind: "message";
      author: string;
      initials: string;
      tone: "teal" | "sky";
      text: string;
      time: string;
      tag?: string;
    }
  | { kind: "own"; text: string; time: string };

export type FeatureVisual =
  | { kind: "chores"; screen: Screen; demo: ChoreDemo }
  | { kind: "shopping"; screen: Screen }
  | { kind: "chat"; entries: ReadonlyArray<ChatEntry> }
  | { kind: "flat"; screen: Screen; cost: FlatCost };

export interface Feature {
  id: string;
  icon: "chores" | "shopping" | "chat" | "flat";
  tone: "teal" | "tangerine" | "sun" | "mint";
  label: string;
  title: string;
  body: string;
  points: ReadonlyArray<Point>;
  visual: FeatureVisual;
}

export interface Step {
  title: string;
  text: string;
  card: { label: string; value: string };
}

export interface Question {
  question: string;
  answer: InlineText;
}

export interface PhoneOption {
  platform: "iphone" | "android";
  label: string;
  subject: string;
  body: string;
}

export interface LandingContent {
  meta: {
    title: string;
    description: string;
    shareTitle: string;
    shareDescription: string;
    shareImage: string;
    shareImageAlt: string;
    url: string;
  };
  skipLink: string;
  header: {
    brand: string;
    home: string;
    navLabel: string;
    nav: ReadonlyArray<Link>;
    cta: Link;
  };
  hero: {
    pill: string;
    title: string;
    titleAccent: string;
    lead: string;
    cta: Link;
    helper: string;
    caption: string;
    screen: Screen;
    glances: { chore: Glance; shopping: Glance };
  };
  fridge: {
    eyebrow: string;
    title: string;
    body: string;
    notes: ReadonlyArray<Note>;
    statement: string;
    statementAccent: string;
  };
  meet: {
    id: string;
    eyebrow: string;
    title: string;
    lead: string;
  };
  features: {
    items: ReadonlyArray<Feature>;
    link: Link;
  };
  steps: {
    eyebrow: string;
    title: string;
    items: ReadonlyArray<Step>;
  };
  maker: {
    eyebrow: string;
    title: string;
    paragraphs: ReadonlyArray<string>;
    signature: string;
    role: string;
    photoAlt: string;
  };
  questions: {
    id: string;
    eyebrow: string;
    title: string;
    items: ReadonlyArray<Question>;
  };
  join: {
    id: string;
    eyebrow: string;
    titleBefore: string;
    titleMuted: string;
    titleAfter: string;
    titleBright: string;
    lead: string;
    question: string;
    phones: ReadonlyArray<PhoneOption>;
    helper: string;
    fallback: string;
    copyLabel: string;
    copiedLabel: string;
    gmailLabel: string;
    gmailSubject: string;
    gmailBody: string;
    email: string;
    sharePrompt: string;
    shareLabel: string;
    shareMessage: string;
  };
  footer: {
    tagline: string;
    links: ReadonlyArray<Link>;
    credit: Link;
    note: string;
  };
  stickyCta: Link;
}
