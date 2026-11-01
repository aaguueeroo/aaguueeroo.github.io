import { ChatEntry } from "../content/types";
import { Icon } from "../ui/Icon";

interface ChatTranscriptProps {
  entries: ReadonlyArray<ChatEntry>;
}

const Entry = ({ entry }: { entry: ChatEntry }) => {
  if (entry.kind === "event") {
    return (
      <li className="chat__event" data-reveal>
        <Icon name="chores" size={16} />
        <span>
          {entry.text} · <time>{entry.time}</time>
        </span>
      </li>
    );
  }

  if (entry.kind === "own") {
    return (
      <li className="chat__own" data-reveal>
        <p className="bubble bubble--own">{entry.text}</p>
        <time className="chat__time">{entry.time}</time>
      </li>
    );
  }

  return (
    <li className="chat__message" data-reveal>
      <span className={`avatar avatar--${entry.tone}`} aria-hidden="true">
        {entry.initials}
      </span>
      <div>
        <p className={`chat__author chat__author--${entry.tone}`}>{entry.author}</p>
        <div className={entry.tag ? "bubble bubble--heads-up" : "bubble"}>
          {entry.tag && (
            <span className="bubble__tag">
              <Icon name="headsUp" size={16} />
              {entry.tag}
            </span>
          )}
          <p>{entry.text}</p>
        </div>
        <time className="chat__time">{entry.time}</time>
      </div>
    </li>
  );
};

// Written out rather than a screenshot, so it stays crisp and each message can arrive on its own.
export const ChatTranscript = ({ entries }: ChatTranscriptProps) => (
  <ol className="chat">
    {entries.map((entry) => (
      <Entry key={entry.text} entry={entry} />
    ))}
  </ol>
);
